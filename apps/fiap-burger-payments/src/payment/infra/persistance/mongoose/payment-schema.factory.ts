import {
  AggregateMergeContext,
  EntitySchemaFactory,
} from '@fiap-burger/tactical-design/core';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Payment } from '../../../domain/payment.entity';
import { MongoosePaymentSchema } from './payment.schema';

@Injectable()
export class MongoosePaymentSchemaFactory
  implements EntitySchemaFactory<MongoosePaymentSchema, Payment>
{
  constructor(private readonly mergeContext: AggregateMergeContext) {}

  entityToSchema(entity: Payment): MongoosePaymentSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      amount: entity.amount,
      status: entity.status,
      type: entity.type,
    };
  }

  schemaToEntity(entitySchema: MongoosePaymentSchema): Payment {
    return this.mergeContext.mergeObjectContext(
      new Payment(
        entitySchema._id.toHexString(),
        entitySchema.type,
        entitySchema.amount,
        entitySchema.status,
      ),
    );
  }
}
