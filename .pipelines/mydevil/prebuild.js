console.log('\x1b[38;5;87mRunning pre-build cleanup.\x1b[0m');
const fs = require('fs');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
  console.log('\x1b[38;5;87mRemoved old build.\x1b[0m');
} else {
  console.log('\x1b[38;5;87mNothing to clean.\x1b[0m');
}
