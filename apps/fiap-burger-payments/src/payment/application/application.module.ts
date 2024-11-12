import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { ApprovePaymentHandler } from './commands/approve-payment.handler';
import { CreatePaymentHandler } from './commands/create-payment.handler';
import { DraftPaymentHandler } from './commands/draft-payment.handler';
import { RejectPaymentHandler } from './commands/reject-payment.handler';

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [
    DraftPaymentHandler,
    CreatePaymentHandler,
    ApprovePaymentHandler,
    RejectPaymentHandler,
  ],
})
export class ApplicationModule {}
