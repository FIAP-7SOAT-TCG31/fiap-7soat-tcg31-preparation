import {
  AggregateMergeContext,
  TransactionManager,
} from '@fiap-burger/tactical-design/core';
import { MongooseRepository } from '@fiap-burger/tactical-design/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preparation } from '../../../domain/entities/preparation.aggregate';
import { MongoosePreparationSchemaFactory } from './preparation-schema.factory';
import { MongoosePreparationSchema } from './preparation.schema';
@Injectable()
export class MongoosePreparationRepository extends MongooseRepository<
  MongoosePreparationSchema,
  Preparation
> {
  constructor(
    protected readonly transactionManager: TransactionManager,
    @InjectModel(MongoosePreparationSchema.name)
    protected readonly preparationModel: Model<MongoosePreparationSchema>,
    protected readonly preparationSchemaFactory: MongoosePreparationSchemaFactory,
    protected readonly mergeContext: AggregateMergeContext,
  ) {
    super(
      mergeContext,
      transactionManager,
      preparationModel,
      preparationSchemaFactory,
    );
  }
}
