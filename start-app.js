// Import the child_process module to run commands concurrently
const { spawn } = require('child_process');

// Set environment variables
process.env.NODE_ENV = 'development';

// Start the Express server for backend
console.log('Starting Express server...');
const server = spawn('node', ['--loader', 'tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

// Clean up process on exit
process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.kill('SIGINT');
  process.exit();
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});