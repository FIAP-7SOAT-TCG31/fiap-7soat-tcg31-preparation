import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentFactory } from '../application/abstractions/payment.factory';
import { PaymentProvider } from '../application/abstractions/payment.provider';
import { PaymentRepository } from '../application/abstractions/payment.repository';
import { MongoosePaymentSchemaFactory } from './persistance/mongoose/payment-schema.factory';
import { MongoosePaymentFactory } from './persistance/mongoose/payment.factory';
import { MongoosePaymentRepository } from './persistance/mongoose/payment.repository';
import {
  MongoosePaymentSchema,
  MongoosePaymentSchemaModel,
} from './persistance/mongoose/payment.schema';
import { FakePixService } from './providers/fake-pix/fake-pix.service';
import { MercadoPagoService } from './providers/mercadopago/mercado-pago.service';

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
      provide: PaymentProvider,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const provider = config.get('PAYMENT_PROVIDER');
        if (provider === 'MERCADO_PAGO') {
          return new MercadoPagoService(config);
        } else {
          return new FakePixService();
        }
      },
    },
    {
      provide: PaymentFactory,
      useClass: MongoosePaymentFactory,
    },
    {
      provide: PaymentRepository,
      useClass: MongoosePaymentRepository,
    },
  ],
  exports: [PaymentFactory, PaymentRepository, PaymentProvider],
})
export class InfraModule {}
