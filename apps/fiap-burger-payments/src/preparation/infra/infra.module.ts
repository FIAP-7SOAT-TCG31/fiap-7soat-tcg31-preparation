import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoosePaymentSchema } from '../../payment/infra/persistance/mongoose/payment.schema';
import { PreparationRepository } from '../application/abstractions/preparation.repository';
import { MongoosePreparationSchemaFactory } from './persistance/mongoose/preparation-schema.factory';
import { MongoosePreparationRepository } from './persistance/mongoose/preparation.repository';
import { MongoosePaymentSchemaModel } from './persistance/mongoose/preparation.schema';

const MongooseSchemaModule = MongooseModule.forFeature([
  {
    name: MongoosePaymentSchema.name,
    schema: MongoosePaymentSchemaModel,
  },
]);

MongooseSchemaModule.global = true;

@Module({
  imports: [MongooseSchemaModule],
  providers: [
    MongoosePreparationSchemaFactory,
    {
      provide: PreparationRepository,
      useClass: MongoosePreparationRepository,
    },
  ],
  exports: [PreparationRepository],
})
export class InfraModule {}
