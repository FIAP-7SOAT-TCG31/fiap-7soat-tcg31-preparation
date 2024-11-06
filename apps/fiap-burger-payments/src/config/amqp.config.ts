import { AmqpModuleOptions, AmqpOptionsFactory } from '@fiap-burger/amqp';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
      prefix: appName,
      exchanges: [
        // ::StyleKeep::
        { name: `${appName}.events` },
      ],
    };
  }
}
