import { FakeMongooseModel } from '@fiap-burger/test-factory/utils';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MongoosePreparationSchema } from '../../infra/persistance/mongoose/preparation.schema';
import { Preparation } from '../dtos/preparation.dto';
import { GetPreparationByIdHandler } from './get-preparation-by-id.handler';
import {
  GetPreparationByIdQuery,
  GetPreparationByIdResult,
} from './get-preparation-by-id.query';

describe('GetPreparationByIdHandler', () => {
  let app: INestApplication;
  let target: GetPreparationByIdHandler;
  let model: FakeMongooseModel<MongoosePreparationSchema>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        GetPreparationByIdHandler,
        {
          provide: getModelToken(MongoosePreparationSchema.name),
          useClass: FakeMongooseModel,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    target = app.get(GetPreparationByIdHandler);
    model = app.get(getModelToken(MongoosePreparationSchema.name));
  });

  it('should throw NotFound if preparation does not exist', async () => {
    const query = new GetPreparationByIdQuery(
      new Types.ObjectId().toHexString(),
    );
    jest.spyOn(model, 'exec').mockResolvedValue(null);
    await expect(() => target.execute(query)).rejects.toThrow(
      NotFoundException,
    );
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
    const query = new GetPreparationByIdQuery(schema._id.toHexString());
    jest.spyOn(model, 'exec').mockResolvedValue(schema);
    const result = await target.execute(query);
    expect(result).toBeInstanceOf(GetPreparationByIdResult);
    expect(result.data).toBeInstanceOf(Preparation);
    expect(result.data.id).toBe(query.id);
  });
});
