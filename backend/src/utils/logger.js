const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
};

const timestamp = () => new Date().toISOString().replace('T', ' ').substring(0, 19);

export const logger = {
  info: (msg, ...args) => {
    console.log(`${colors.dim}[${timestamp()}]${colors.reset} ${colors.cyan}ℹ INFO${colors.reset} ${msg}`, ...args);
  },
  success: (msg, ...args) => {
    console.log(`${colors.dim}[${timestamp()}]${colors.reset} ${colors.green}✔ SUCCESS${colors.reset} ${msg}`, ...args);
  },
  warn: (msg, ...args) => {
    console.warn(`${colors.dim}[${timestamp()}]${colors.reset} ${colors.yellow}⚠ WARN${colors.reset} ${msg}`, ...args);
  },
  error: (msg, ...args) => {
    console.error(`${colors.dim}[${timestamp()}]${colors.reset} ${colors.red}✖ ERROR${colors.reset} ${msg}`, ...args);
  },
};
