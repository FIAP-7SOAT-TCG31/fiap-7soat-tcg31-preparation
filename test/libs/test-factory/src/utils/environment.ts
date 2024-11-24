import { randomUUID } from 'crypto';

const rabbitmqHost = 'localhost';
const postgresHost = 'localhost';

const username = {
  rabbitmq: 'fiapburger',
  postgres: 'postgres',
};
const password = `fiapburger`;
export const virtualEnvironment = randomUUID().split('-').at(0);
export const rabbitmqURL = `http://${username.rabbitmq}:${password}@${rabbitmqHost}:15672`;
export const postgresURL = `http://${username.postgres}:${password}@${postgresHost}:5432/postgres`;

export const environment = {
  NODE_ENV: 'testing',
  POSTGRES_URL: `postgresql://postgres:fiapburger@${postgresHost}/${virtualEnvironment}?ApplicationName=FiapBurgerPreparationTest`,
  AMQP_URL: `amqp://${username.rabbitmq}:${password}@${rabbitmqHost}:5672/${virtualEnvironment}`,
};
