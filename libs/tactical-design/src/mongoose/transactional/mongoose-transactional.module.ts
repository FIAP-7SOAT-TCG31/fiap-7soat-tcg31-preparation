import { TransactionalModule } from '@fiap-burger/tactical-design/core';
import { Module } from '@nestjs/common';
import { MongooseTransactionManager } from './mongoose-transaction.manager';

@Module({
  imports: [
    TransactionalModule.forFeature({
      TransactionManagerAdapter: MongooseTransactionManager,
    }),
  ],
})
export class MongooseTransactionalModule {}
