import winston from 'winston';
import { ILogRecord } from './dataLog';

const errorRecordTypes = ['error', 'uncaughtException'];

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
    }),
    new winston.transports.File({ level: 'info', filename: './logs/info.log' }),
  ],
});

export function writeToLog(
  logRecord: ILogRecord,
  exitOnFinishCode: number | undefined
): void {
  if (errorRecordTypes.includes(logRecord.recordType))
    Promise.resolve(logger.error(logRecord)).then(() => {
      if (exitOnFinishCode !== undefined) process.exit(exitOnFinishCode);
    });
  logger.info(logRecord);
}
