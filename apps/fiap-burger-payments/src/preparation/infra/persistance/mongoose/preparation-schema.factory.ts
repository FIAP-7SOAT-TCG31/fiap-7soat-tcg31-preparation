import { EntitySchemaFactory } from '@fiap-burger/tactical-design/core';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Preparation } from '../../../domain/entities/preparation.aggregate';
import { PreparationStatusFactory } from '../../../domain/values/preparation-status.value';
import { MongoosePreparationSchema } from './preparation.schema';

@Injectable()
export class MongoosePreparationSchemaFactory
  implements EntitySchemaFactory<MongoosePreparationSchema, Preparation>
{
  entityToSchema(entity: Preparation): MongoosePreparationSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      description: entity.description,
      status: entity.status.value,
      requestedAt: entity.requestedAt,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt,
    };
  }

  schemaToEntity(entitySchema: MongoosePreparationSchema): Preparation {
    return new Preparation(
      entitySchema._id.toHexString(),
      entitySchema.description,
      PreparationStatusFactory.create(entitySchema.status),
      entitySchema.requestedAt,
      entitySchema.startedAt,
      entitySchema.updatedAt,
    );
  }
}
