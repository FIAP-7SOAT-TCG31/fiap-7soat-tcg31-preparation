import { ContextService } from '@fiap-burger/setup';
import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { Transaction, TransactionManager } from '../../core';
import { MongooseTransaction } from './mongoose.transaction';

@Injectable()
export class MongooseTransactionManager extends TransactionManager {
  constructor(
    protected readonly context: ContextService,
    protected readonly connection: Connection,
  ) {
    super(context);
  }

  async createTransaction(): Promise<Transaction> {
    const session = await this.connection.startSession();
    return new MongooseTransaction(session);
  }
}
