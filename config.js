import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';
const logDir = path.join(__dirname, 'log');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YY:MM:DD HH:mm:ss' }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, 'access.log'), level: 'info' }),
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
    new transports.File({ filename: path.join(logDir, 'custom.log'), level: 'warn' }),
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  Logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

