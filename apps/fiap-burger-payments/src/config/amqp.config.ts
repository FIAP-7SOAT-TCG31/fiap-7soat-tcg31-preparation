import { AmqpModuleOptions, AmqpOptionsFactory } from '@fiap-burger/amqp';
import { toDottedNotation } from '@fiap-burger/amqp/utils/amqp-infrastructure.util';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const withPrefix = (value: string) =>
  `${toDottedNotation('FiapBurgerPayments')}.${toDottedNotation(value)}`;

@Injectable()
export class AmqpConfig implements AmqpOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createAmqpOptions(): AmqpModuleOptions {
    const [appName, url] = [
      this.config.getOrThrow('APP_NAME'),
      this.config.getOrThrow('AMQP_URL'),
    ];
    return {
      url,
      appName,
      prefix: 'FiapBurgerPayments',
      exchanges: [
        // ::StyleKeep::
        { name: withPrefix('events') },
      ],
    };
  }
}
