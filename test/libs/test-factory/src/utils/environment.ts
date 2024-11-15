import { randomUUID } from 'crypto';

const rabbitmqHost = process.env.CI ? 'fiapburger-rabbitmq' : 'localhost';
const mongodbHost = process.env.CI ? 'fiapburger-mongodb' : 'localhost';

const basicBearer = `fiapburger:fiapburger`;
export const virtualEnvironment = randomUUID().split('-').at(0);
export const rabbitmqURL = `http://${basicBearer}@${rabbitmqHost}:15672`;

export const environment = {
  NODE_ENV: 'testing',
  MONGO_URL: `mongodb://${basicBearer}@${mongodbHost}:27017/${virtualEnvironment}?authSource=admin`,
  AMQP_URL: `amqp://${basicBearer}@${rabbitmqHost}:5672/${virtualEnvironment}`,
};
