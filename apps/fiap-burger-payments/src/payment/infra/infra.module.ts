import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentFactory } from '../application/abstractions/payment.factory';
import { PaymentRepository } from '../application/abstractions/payment.repository';
import { MongoosePaymentSchemaFactory } from './payment-schema.factory';
import { MongoosePaymentFactory } from './payment.factory';
import { MongoosePaymentRepository } from './payment.repository';
import {
  MongoosePaymentSchema,
  MongoosePaymentSchemaModel,
} from './payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoosePaymentSchema.name,
        schema: MongoosePaymentSchemaModel,
      },
    ]),
  ],
  providers: [
    MongoosePaymentSchemaFactory,
    {
      provide: PaymentFactory,
      useClass: MongoosePaymentFactory,
    },
    {
      provide: PaymentRepository,
      useClass: MongoosePaymentRepository,
    },
  ],
  exports: [PaymentFactory, PaymentRepository],
})
export class InfraModule {}
