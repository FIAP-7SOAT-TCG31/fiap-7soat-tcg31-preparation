import {
  AggregateMergeContext,
  TransactionManager,
} from '@fiap-burger/tactical-design/core';
import { MongooseRepository } from '@fiap-burger/tactical-design/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../../domain/payment.entity';
import { MongoosePaymentSchemaFactory } from './payment-schema.factory';
import { MongoosePaymentSchema } from './payment.schema';

@Injectable()
export class MongoosePaymentRepository extends MongooseRepository<
  MongoosePaymentSchema,
  Payment
> {
  constructor(
    protected readonly transactionManager: TransactionManager,
    @InjectModel(MongoosePaymentSchema.name)
    protected readonly paymentModel: Model<MongoosePaymentSchema>,
    protected readonly paymentSchemaFactory: MongoosePaymentSchemaFactory,
    protected readonly mergeContext: AggregateMergeContext,
  ) {
    super(mergeContext, transactionManager, paymentModel, paymentSchemaFactory);
  }
}
