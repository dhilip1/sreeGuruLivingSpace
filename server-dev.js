import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start the Express server
console.log('Starting Express server...');
const server = spawn('node', ['--loader', 'tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' },
  cwd: __dirname,
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