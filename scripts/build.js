const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean up the dist directory
const distDir = path.join(__dirname, '../dist');

if (fs.existsSync(distDir)) {
  console.log('Cleaning dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

console.log('Build directory cleaned successfully.');

// Build the library
console.log('Building library...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build completed successfully!');