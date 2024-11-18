import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { Preparation } from '../../../domain/entities/preparation.aggregate';
import { PreparationStatusFactory } from '../../../domain/values/preparation-status.value';
import { MongoosePreparationSchemaFactory } from './preparation-schema.factory';
import { MongoosePreparationSchema } from './preparation.schema';

describe('MongoosePreparationSchemaFactory', () => {
  let app: INestApplication;
  let target: MongoosePreparationSchemaFactory;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [MongoosePreparationSchemaFactory],
    }).compile();

    app = moduleFixture.createNestApplication();
    target = app.get(MongoosePreparationSchemaFactory);
  });

  it('should transform a Preparation Entity into a MongooseSchema', async () => {
    const preparation = new Preparation(
      new Types.ObjectId().toHexString(),
      'dummy',
      PreparationStatusFactory.create('Completed'),
      new Date(),
      new Date(),
      new Date(),
    );

    const result = target.entityToSchema(preparation);
    expect(result._id).toBeInstanceOf(Types.ObjectId);
    expect(result).not.toBeInstanceOf(Preparation);
  });

  it('should transform a MongooseSchema into a PreparationEntity', async () => {
    const preparation: MongoosePreparationSchema = {
      _id: new Types.ObjectId(),
      description: 'dummy',
      requestedAt: new Date(),
      startedAt: new Date(),
      completedAt: new Date(),
      status: 'Completed',
    };
    const result = target.schemaToEntity(preparation);
    expect(result.id).not.toBeInstanceOf(Types.ObjectId);
    expect(result.id).toBe(preparation._id.toHexString());
    expect(result).toBeInstanceOf(Preparation);
  });
});
