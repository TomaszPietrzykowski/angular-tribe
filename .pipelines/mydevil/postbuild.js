const fs = require('fs');
const path = require('path');
console.log('\x1b[38;5;87mRunning post-build script.\n\x1b[0m');
// Define paths
const nxBuild = `dist/apps/angular-tribe`;
const backendBuildDir = `${nxBuild}/server`;
const frontendBuildDir = `${nxBuild}/browser`;
const destinationDir = `dist/public_nodejs`;

try {
  // Ensure the destination directory exists
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }

  // Copy backend build to destination directory
  fs.cpSync(backendBuildDir, destinationDir, {
    recursive: true,
  });

  // Create a directory for frontend build within the destination directory
  const frontendDestDir = `${destinationDir}/public`;
  if (!fs.existsSync(frontendDestDir)) {
    fs.mkdirSync(frontendDestDir);
  }

  // Copy frontend build to the frontend directory inside the destination directory
  fs.cpSync(frontendBuildDir, frontendDestDir, { recursive: true });

  // Delete original backend build directory
  fs.rmSync(nxBuild, { recursive: true });

  // Rename entry file
  fs.renameSync(`${destinationDir}/server.mjs`, `${destinationDir}/app.mjs`);

  // Copy .env
  if (fs.existsSync('apps/angular-tribe/server/.env')) {
    fs.copyFileSync(
      'apps/angular-tribe/server/.env',
      'dist/public_nodejs/.env'
    );
  }

  // Copy package.json and cleanup server-irrelevant data
  const srcPath = 'package.json';
  const destPath = 'dist/public_nodejs/package.json';

  if (fs.existsSync(srcPath)) {
    // Read the original package.json
    const packageJson = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

    // Remove unwanted fields
    delete packageJson.scripts;
    delete packageJson.devDependencies;

    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(destPath, JSON.stringify(packageJson, null, 2));
  }

  console.log('\x1b[38;5;87mPost-build success.\n\x1b[0m');
} catch (err) {
  console.error('Error during post-build:', err);
  process.exit(1);
}
