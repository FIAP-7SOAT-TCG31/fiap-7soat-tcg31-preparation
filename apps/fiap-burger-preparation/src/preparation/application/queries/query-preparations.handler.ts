import { IQueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
// import { MongoosePreparationSchema } from '../../infra/persistance/mongoose/preparation.schema';
import { Preparation } from '../dtos/preparation.dto';
import {
  QueryPreparationsQuery,
  QueryPreparationsResult,
} from './query-preparations.query';

// @QueryHandler(QueryPreparationsQuery)
export class QueryPreparationsHandler
  implements IQueryHandler<QueryPreparationsQuery, QueryPreparationsResult>
{
  constructor(
    // @InjectModel(MongoosePreparationSchema.name)
    private readonly queryModel: Model<any>,
  ) {}

  async execute({
    data,
  }: QueryPreparationsQuery): Promise<QueryPreparationsResult> {
    const { orderId, status } = data;
    const query: any = {};
    if (orderId) {
      query.description = `Order:${orderId}`;
    }
    if (status) {
      query.status = status;
    }
    const result = await this.queryModel.find(query).exec();

    return new QueryPreparationsResult(
      (result ?? []).map(
        (x) =>
          new Preparation({
            id: x._id.toHexString(),
            description: x.description,
            items: x.items,
            status: x.status,
            requestedAt: x.requestedAt,
            startedAt: x.startedAt,
            completedAt: x.completedAt,
            createdAt: x.createdAt,
            updatedAt: x.updatedAt,
          }),
      ),
    );
  }
}
