const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2');
const env = require('./mydevil.config');

const conn = new Client();
const localDistPath = path.join(__dirname, '../../dist/public_nodejs');
const remotePath = `domains/${env.APP_DOMAIN}/public_nodejs`;

console.log(
  '\x1b[38;5;87mStarting pipeline: \x1b[38;5;214mmydevil\x1b[38;5;83m\n\x1b[0m'
);
conn
  .on('ready', () => {
    console.log('\x1b[38;5;87mConnection established.\n\x1b[0m');
    // 1. Remove old build
    conn.exec(`find ${remotePath} -mindepth 1 -delete`, (err, stream) => {
      if (err) throw err;
      console.log('\x1b[38;5;87mRemoving old build.\n\x1b[0m');

      stream
        .on('close', () => {
          // 2. Upload build:
          conn.sftp((err, sftp) => {
            if (err) throw err;
            console.log(
              `\x1b[38;5;87mCopying files${
                env.VERBOSE_LOG ? ': ' : '...\n'
              }\x1b[0m`
            );

            uploadDirPromise(sftp, localDistPath, remotePath).then(() => {
              // 3. Run npm install in the remote build directory
              conn.exec(
                `cd ${remotePath} && npm install && devil www restart angulartribe.com`,
                (err, stream) => {
                  if (err) throw err;
                  console.log(
                    `${
                      env.VERBOSE_LOG ? '\n' : ''
                    }\x1b[38;5;87mInstalling dependencies...\n\x1b[0m`
                  );
                  stream
                    .on('close', () => {
                      console.log(
                        `\x1b[38;5;87mInstallation complete.\n\x1b[0m`
                      );
                      console.log(
                        `\x1b[38;5;83mDeployment to \x1b[38;5;214mmydevil \x1b[38;5;83msuccessful.\n\x1b[0m`
                      );
                      conn.end(); // Close the connection
                    })
                    .on('data', (data) => {
                      if (env.VERBOSE_LOG) {
                        const literal = `${data}`;
                        const parsed = literal.replace('\n', '');
                        if (parsed.includes('audited')) {
                          console.log(`\x1b[38;5;87m${parsed}\n\x1b[0m`);
                        }
                      }
                    })
                    .stderr.on('data', (data) => {
                      console.log(`\x1b[38;5;87m${data}\n\x1b[0m`);
                    });
                }
              );
            });
          });
        })
        .on('data', (data) => {
          console.log('STDOUT: ' + data);
        })
        .stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
    });
  })
  .on('error', (error) => {
    console.log(error);
  })
  .on(
    'keyboard-interactive',
    (name, instructions, instructionsLang, prompts, finish) => {
      // Assume that the server expects the password to be provided in response to the first prompt
      if (
        prompts.length > 0 &&
        prompts[0].prompt.toLowerCase().includes('password')
      ) {
        finish([env.MY_DEVIL_PASSWORD]);
      } else {
        finish([]);
      }
    }
  )
  .connect({
    host: env.MY_DEVIL_HOST,
    username: env.MY_DEVIL_USER,
    port: 22,
    tryKeyboard: true,
  });

const uploadDirPromise = (sftp, localDir, remoteDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(localDir, (err, files) => {
      if (err) return reject(err);

      const uploadPromises = files.map((file) => {
        const localFilePath = path.join(localDir, file);
        const remoteFilePath = path.join(remoteDir, file).replace(/\\/g, '/');

        return new Promise((fileResolve, fileReject) => {
          fs.stat(localFilePath, (err, stats) => {
            if (err) return fileReject(err);

            if (stats.isDirectory()) {
              sftp.mkdir(remoteFilePath, { mode: '0755' }, (err) => {
                if (err && err.code !== 4) return fileReject(err); // Ignore "failure" error
                uploadDirPromise(sftp, localFilePath, remoteFilePath)
                  .then(fileResolve)
                  .catch(fileReject);
              });
            } else {
              sftp.fastPut(localFilePath, remoteFilePath, (err) => {
                if (err) return fileReject(err);

                if (env.VERBOSE_LOG) {
                  console.log(
                    `\x1b[38;5;87mUploaded: ${localFilePath} to ${remoteFilePath}\x1b[0m`
                  );
                }
                fileResolve();
              });
            }
          });
        });
      });

      Promise.all(uploadPromises).then(resolve).catch(reject);
    });
  });
};
