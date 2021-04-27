import app from './app';

const domain: string = 'localhost';

const serverReady = () =>
  console.log(
    `⚡ Server is running here 👉 http://${domain}:${app.get('port')}/`,
  );

app.listen(app.get('port'), serverReady);
