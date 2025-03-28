const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean dist directory
console.log('Cleaning dist directory...');
if (fs.existsSync(path.join(__dirname, '../dist'))) {
  fs.rmSync(path.join(__dirname, '../dist'), { recursive: true, force: true });
}

// Build the library
console.log('Building library...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build completed successfully!');