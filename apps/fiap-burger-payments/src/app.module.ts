import { AmqpModule } from '@fiap-burger/amqp';
import { CommonModule, ContextModule } from '@fiap-burger/setup';
import { AmqpTacticalDesignModule } from '@fiap-burger/tactical-design/amqp';
import { TacticalDesignModule } from '@fiap-burger/tactical-design/core';
import {
  MongooseTacticalDesignModule,
  MongooseTransactionalModule,
} from '@fiap-burger/tactical-design/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmqpConfig } from './config/amqp.config';
import { AppConfig } from './config/app.config';
import { MongooseConfig } from './config/mongoose.config';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContextModule.forRoot({}),
    CommonModule.forRootAsync({ useClass: AppConfig }),
    MongooseModule.forRootAsync({ useClass: MongooseConfig }),
    AmqpModule.forRootAsync({ useClass: AmqpConfig }),
    TacticalDesignModule,
    MongooseTacticalDesignModule,
    AmqpTacticalDesignModule,
    MongooseTransactionalModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
