import { NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { Model, Types } from 'mongoose';
// import { MongoosePreparationSchema } from '../../infra/persistance/mongoose/preparation.schema';
import { Preparation } from '../dtos/preparation.dto';
import {
  GetPreparationByIdQuery,
  GetPreparationByIdResult,
} from './get-preparation-by-id.query';

// @QueryHandler(GetPreparationByIdQuery)
export class GetPreparationByIdHandler
  implements IQueryHandler<GetPreparationByIdQuery, GetPreparationByIdResult>
{
  constructor(
    // @InjectModel(MongoosePreparationSchema.name)
    private readonly queryModel: Model<any>,
  ) {}

  async execute({
    id,
  }: GetPreparationByIdQuery): Promise<GetPreparationByIdResult> {
    const result = await this.queryModel
      .findById(new Types.ObjectId(id))
      .exec();

    if (!result) {
      throw new NotFoundException();
    }

    return new GetPreparationByIdResult(
      new Preparation({
        id: result._id.toHexString(),
        description: result.description,
        items: result.items,
        status: result.status,
        requestedAt: result.requestedAt,
        startedAt: result.startedAt,
        completedAt: result.completedAt,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      }),
    );
  }
}
