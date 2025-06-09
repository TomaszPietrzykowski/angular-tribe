const fs = require('fs');
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
  //   if (fs.existsSync('dist/libs')) {
  //     fs.rmSync('dist/libs', { recursive: true });
  //   }
  // flatten the build to dist folder
  //   fs.cpSync('dist/temp', 'dist', {
  //     recursive: true,
  //   });
  //   fs.rmSync('dist/temp', { recursive: true });
  if (fs.existsSync('apps/angular-tribe/server/.env')) {
    fs.copyFileSync(
      'apps/angular-tribe/server/.env',
      'dist/public_nodejs/.env'
    );
  }

  if (fs.existsSync('package.json')) {
    fs.copyFileSync('package.json', 'dist/public_nodejs/package.json');
  }

  console.log('\x1b[38;5;87mPost-build success.\n\x1b[0m');
} catch (err) {
  console.error('Error during post-build:', err);
  process.exit(1);
}
