import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { finished } from 'stream';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './authentication/login.router';
import { logIt } from './logger/index';
import { authenticate } from './authentication/authenticate';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// Endpoints WITHOUT authentication
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

app.use('/login', loginRouter);

// Authentication
app.use(authenticate);

// Endpoints WITH authentication
app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks/', taskRouter);

app.use((error: Error, req: Request, res: Response, _next?: NextFunction) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ Error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  finished(res, () => logIt({ res, req, error, recordType: 'error' }));
});

process.on('uncaughtException', (error: Error) => {
  logIt({ recordType: 'uncaughtException', error }, 2);
});

process.on('unhandledRejection', (error: Error) => {
  logIt({ recordType: 'unhandledRejection', error });
});

export default app;
