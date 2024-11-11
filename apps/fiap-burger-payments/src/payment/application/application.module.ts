import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { CreatePaymentHandler } from './commands/create-payment.handler';
import { DraftPaymentHandler } from './commands/draft-payment.handler';

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [DraftPaymentHandler, CreatePaymentHandler],
})
export class ApplicationModule {}
