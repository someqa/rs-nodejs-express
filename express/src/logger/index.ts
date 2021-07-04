import { ILogData, convertToLogRecord } from './dataLog';
import { writeToLog } from './writeToLog';

export function logIt(logData: ILogData, exitOnFinishCode?: number): void {
  const logRecord = convertToLogRecord(logData);
  writeToLog(logRecord, exitOnFinishCode);
}
