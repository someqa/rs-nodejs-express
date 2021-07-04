import config from './common/config';
import app from './app';
import { tryConnectToDb } from './database';

tryConnectToDb(() => {
  app.listen(config.PORT, () =>
    console.log(`App is running on http://localhost:${config.PORT}`)
  );
});
