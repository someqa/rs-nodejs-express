import { Request, Response } from 'express';

type RecordType = 'error' | 'uncaughtException' | 'info' | 'unhandledRejection';

export interface ILogData {
  recordType: RecordType;
  req?: Request;
  res?: Response;
  error?: Error;
}

export interface ILogRecord {
  recordType: RecordType;
  date: Date;
  url?: string;
  queryParams?: string;
  body?: string;
  statusCode?: number;
  error?: string;
}

export function convertToLogRecord({
  req,
  res,
  error,
  recordType,
}: ILogData): ILogRecord {
  let dataLog: ILogRecord = {
    recordType,
    date: new Date(),
  };

  if (req) {
    dataLog = {
      ...dataLog,
      url: req.originalUrl,
      queryParams: JSON.stringify(req.query),
      body: req.body,
    };
  }

  if (res) dataLog.statusCode = res.statusCode;

  if (error) dataLog.error = error.stack;

  return dataLog;
}
