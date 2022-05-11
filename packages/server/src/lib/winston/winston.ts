import winston, { createLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;
const logDirPath = 'logs';
const logFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

const transports = [
	new DailyRotateFile({
		level: 'info',
		datePattern: 'YYYY-MM-DD-HH',
		dirname: logDirPath,
		filename: '%DATE%.log',
		maxFiles: '60d',
		zippedArchive: true
	}),
	new DailyRotateFile({
		level: 'error',
		datePattern: 'YYYY-MM-DD-HH',
		dirname: `${logDirPath}/error`,
		filename: '%DATE%.log',
		maxFiles: '60d',
		zippedArchive: true
	})
];

const logger = createLogger({
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		logFormat
	),
	transports
});

logger.add(
	new winston.transports.Console({
		format: combine(winston.format.colorize(), winston.format.simple())
	})
);

export default logger;
