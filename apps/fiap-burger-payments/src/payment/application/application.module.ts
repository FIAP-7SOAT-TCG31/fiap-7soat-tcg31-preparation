import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { DraftPaymentHandler } from './commands/draft-payment.handler';

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [DraftPaymentHandler],
})
export class ApplicationModule {}
