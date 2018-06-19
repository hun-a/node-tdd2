import redis from 'redis';

const options = {
  host: 'localhost',
  port: 6379
};
const client = redis.createClient(options);

export default client;
