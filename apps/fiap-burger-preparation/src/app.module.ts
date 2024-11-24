import { AmqpModule } from '@fiap-burger/amqp';
import { CommonModule, ContextModule, HealthzModule } from '@fiap-burger/setup';
import { AmqpTacticalDesignModule } from '@fiap-burger/tactical-design/amqp';
import { TacticalDesignModule } from '@fiap-burger/tactical-design/core';
import {
  TypeormTacticalDesignModule,
  TypeormTransactionalModule,
} from '@fiap-burger/tactical-design/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmqpConfig } from './config/amqp.config';
import { AppConfig } from './config/app.config';
import { TypeormConfig } from './config/typeorm.config';
import { PreparationModule } from './preparation/preparation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContextModule.forRoot({}),
    CommonModule.forRootAsync({ useClass: AppConfig }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfig }),
    AmqpModule.forRootAsync({ useClass: AmqpConfig }),
    HealthzModule,
    TacticalDesignModule,
    TypeormTacticalDesignModule,
    TypeormTransactionalModule,
    AmqpTacticalDesignModule,
    PreparationModule,
  ],
})
export class AppModule {}
