const pino = require('pino');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');

// Создаём директорию logs
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logStream = fs.createWriteStream(path.join(logDir, 'app.log'), { flags: 'a' });

const customTimeFunction = () => {
    const now = new Date();
    const localized = moment(now).tz('Asia/Yekaterinburg').format('YYYY-MM-DD HH:mm:ss');
    return `,"time":"${localized}"`;
};

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    timestamp: customTimeFunction,
    formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
    },
    transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
            ignore: 'pid,hostname',
        }
    } : undefined,
}, process.env.NODE_ENV === 'production' ? logStream : undefined);

module.exports = logger;