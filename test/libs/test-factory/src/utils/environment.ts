import { randomUUID } from 'crypto';

const basicBearer = `fiapburger:fiapburger`;
export const virtualEnvironment = randomUUID().split('-').at(0);

export const environment = {
  NODE_ENV: 'testing',
  MONGO_URL: `mongodb://${basicBearer}@localhost:27017/${virtualEnvironment}?authSource=admin`,
};
