import 'reflect-metadata';
import { getConnection, createConnection } from 'typeorm';
import typeOrmConfig from '../../ormconfig';
import config from "../common/config"

const connectToDb = async (): Promise<void> => {
  try {
    await createConnection(typeOrmConfig);
  } catch (error) {
    console.error(`Connection was not created: ${error}`);
  }

  const connection = getConnection();

  if (connection) {
    if (!connection.isConnected) await connection.connect();
    await connection.runMigrations();
  }
};

const maxReconnectCount=config.MAX_RECONNECT_COUNT||10;

export const tryConnectToDb = async (callback: () => void, reconnectCount=0): Promise<void> => {
  try {
    await connectToDb();
    callback();
  } catch (error) {
    console.error(`Error #${reconnectCount} when connecting to DB: ${error}`);
    if (reconnectCount<maxReconnectCount) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await tryConnectToDb(callback, reconnectCount+1)}
  }
};
