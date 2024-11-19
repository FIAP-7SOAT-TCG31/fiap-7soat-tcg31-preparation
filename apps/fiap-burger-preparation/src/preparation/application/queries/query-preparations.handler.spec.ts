import { FakeMongooseModel } from '@fiap-burger/test-factory/utils';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MongoosePreparationSchema } from '../../infra/persistance/mongoose/preparation.schema';
import { QueryPreparationsInput } from '../dtos/query-preparations.input';
import { QueryPreparationsHandler } from './query-preparations.handler';
import {
  QueryPreparationsQuery,
  QueryPreparationsResult,
} from './query-preparations.query';

describe('QueryPreparationsHandler', () => {
  let app: INestApplication;
  let target: QueryPreparationsHandler;
  let model: FakeMongooseModel<MongoosePreparationSchema>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        QueryPreparationsHandler,
        {
          provide: getModelToken(MongoosePreparationSchema.name),
          useClass: FakeMongooseModel,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    target = app.get(QueryPreparationsHandler);
    model = app.get(getModelToken(MongoosePreparationSchema.name));
  });

  it('should emptyset if not found', async () => {
    const dto = new QueryPreparationsInput();
    dto.orderId = '123';
    dto.status = 'Created';
    const query = new QueryPreparationsQuery(dto);
    jest.spyOn(model, 'exec').mockResolvedValue(null);
    const result = await target.execute(query);
    expect(result).toBeInstanceOf(QueryPreparationsResult);
    expect(result.data).toBeInstanceOf(Array);
    expect(result.data.length).toBe(0);
  });

  it('should return existing preparation if found', async () => {
    const schema: MongoosePreparationSchema = {
      _id: new Types.ObjectId(),
      description: 'dummy',
      items: ['XBurger'],
      completedAt: new Date(),
      requestedAt: new Date(),
      startedAt: new Date(),
      status: 'Completed',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const dto = new QueryPreparationsInput();
    dto.orderId = '123';
    dto.status = 'Completed';
    const query = new QueryPreparationsQuery(dto);
    jest.spyOn(model, 'exec').mockResolvedValue([schema]);
    const result = await target.execute(query);
    expect(result).toBeInstanceOf(QueryPreparationsResult);
    expect(result.data).toBeInstanceOf(Array);
  });
});
