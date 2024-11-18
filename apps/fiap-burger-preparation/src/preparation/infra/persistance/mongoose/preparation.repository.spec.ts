import {
  AggregateMergeContext,
  TransactionManager,
} from '@fiap-burger/tactical-design/core';
import { FakeMongooseModel } from '@fiap-burger/test-factory/utils';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PreparationRepository } from '../../../application/abstractions/preparation.repository';
import { MongoosePreparationSchemaFactory } from './preparation-schema.factory';
import { MongoosePreparationRepository } from './preparation.repository';
import { MongoosePreparationSchema } from './preparation.schema';

describe('MongoosePreparationRepository', () => {
  let app: INestApplication;
  let target: PreparationRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionManager,
          useValue: Object.create(TransactionManager.prototype),
        },
        {
          provide: getModelToken(MongoosePreparationSchema.name),
          useClass: FakeMongooseModel,
        },
        {
          provide: MongoosePreparationSchemaFactory,
          useValue: Object.create(MongoosePreparationSchema.prototype),
        },
        {
          provide: AggregateMergeContext,
          useValue: Object.create(AggregateMergeContext.prototype),
        },
        {
          provide: PreparationRepository,
          useClass: MongoosePreparationRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    target = app.get(PreparationRepository);
  });

  it('should instantiate correctly', async () => {
    expect(target).toBeInstanceOf(MongoosePreparationRepository);
  });
});
