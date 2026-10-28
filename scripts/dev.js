import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('\n=============================================================');
console.log('🚀 Starting Abhiraj Yadav Portfolio (Full Stack MERN System)');
console.log('   - Frontend: http://localhost:5173');
console.log('   - Backend:  http://localhost:5001');
console.log('=============================================================\n');

function runService(name, cwd, color, command, args) {
  const child = spawn(command, args, {
    cwd,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
  });

  const prefix = `${color}[${name}]${'\x1b[0m'}`;

  child.stdout.on('data', (data) => {
    const lines = data.toString().trimEnd().split('\n');
    lines.forEach((line) => console.log(`${prefix} ${line}`));
  });

  child.stderr.on('data', (data) => {
    const lines = data.toString().trimEnd().split('\n');
    lines.forEach((line) => console.error(`${prefix} ${line}`));
  });

  child.on('close', (code) => {
    console.log(`${prefix} exited with code ${code}`);
  });

  return child;
}

const backend = runService(
  'BACKEND',
  path.join(rootDir, 'backend'),
  '\x1b[36m', // Cyan
  npmCmd,
  ['run', 'dev']
);

const frontend = runService(
  'FRONTEND',
  path.join(rootDir, 'frontend'),
  '\x1b[35m', // Magenta
  npmCmd,
  ['run', 'dev']
);

function cleanup() {
  console.log('\nShutting down frontend and backend services...');
  if (isWindows) {
    if (backend.pid) spawn('taskkill', ['/pid', backend.pid, '/f', '/t']);
    if (frontend.pid) spawn('taskkill', ['/pid', frontend.pid, '/f', '/t']);
  } else {
    backend.kill('SIGTERM');
    frontend.kill('SIGTERM');
  }
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
