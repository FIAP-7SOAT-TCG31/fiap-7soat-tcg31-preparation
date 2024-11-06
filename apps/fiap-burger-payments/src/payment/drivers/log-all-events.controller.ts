import { AmqpRetrialPolicy, AmqpSubscription } from '@fiap-burger/amqp';
import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class LogAllEventsController {
  @AmqpSubscription({
    exchange: 'fiap.burger.payments.events',
    routingKey: '#',
    queue: 'log-all-events',
  })
  @AmqpRetrialPolicy({
    delay: 5000,
    maxAttempts: 5,
    maxDelay: 5000,
  })
  async execute(@Body() data: any) {
    console.log(JSON.stringify({ message: 'got through here', data }, null, 2));
  }
}
