import app from './';
import client from './data/connector';

client.on('connect', () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});