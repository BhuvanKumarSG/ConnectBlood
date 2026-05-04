const { execSync } = require('child_process');
const fs = require('fs');
// Change this line inside test-agent.js
const success = runCommand('node --experimental-vm-modules node_modules/jest/bin/jest.js root_backend.test.js --detectOpenHandles');
/**
 * AI Test Agent: 
 * 1. Checks for dependencies
 * 2. Runs Jest unit tests
 * 3. Reports status to GitHub Actions
 */

const runCommand = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (e) {
    return false;
  }
};

console.log('🤖 AI Test Agent starting...');

// Step 1: Ensure dependencies exist
if (!fs.existsSync('./node_modules')) {
  console.log('📦 node_modules missing. Installing dependencies...');
  runCommand('npm install');
}

// Step 2: Execute the tests
console.log('🚀 Running Unit Tests via Jest...');
const success = runCommand('npx jest root_backend.test.js --detectOpenHandles');

if (success) {
  console.log('✅ AI Agent: All tests passed!');
  process.exit(0);
} else {
  console.log('❌ AI Agent: Tests failed.');
  process.exit(1);
}
