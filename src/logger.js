import winston from 'winston';
const { combine, timestamp, label, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
    const log = { level, timestamp, data: JSON.parse(message) };
    return JSON.stringify(log);
});

export const createCustomLoggerFile = (pathFile, level = 'info') => winston.createLogger({
    level: level,
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.File({ filename: pathFile }),
    ],
});

export const loggerKirimPesan = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.File({ filename: './logger/kirim-pesan-error.log', level: 'error' }),
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({ filename: './logger/kirim-pesan.log' }),
    ],
});

export const loggerTerimaPesan = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.File({ filename: './logger/terima-pesan.log' }),
    ],
});