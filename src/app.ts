import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { finished } from 'stream';
import userRouter from './resources/users/user.router.js';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import { logIt } from './logger/index.js';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

const app = express();
const swaggerDocument = YAML.load(path.join(dirName, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', (req, res, next) => {
  next();
  finished(res, () => logIt({ res, req, recordType: 'info' }));
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks/', taskRouter);

app.use((error: Error, req: Request, res: Response, _next?: NextFunction) => {
  res.sendStatus(500);
  finished(res, () => logIt({ res, req, error, recordType: 'error' }));
});

process.on('uncaughtException', (error: Error) => {
  logIt({ recordType: 'uncaughtException', error }, 1);
});

process.on('unhandledRejection', (error: Error) => {
  logIt({ recordType: 'unhandledRejection', error });
});

export default app;
