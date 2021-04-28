import app from './app';
import database from './config/database';

const domain: string = 'localhost';

database().catch(console.error);

const serverReady = () =>
  console.log(
    `⚡ Server is running here 👉 http://${domain}:${app.get('port')}/`,
  );

app.listen(app.get('port'), serverReady);
