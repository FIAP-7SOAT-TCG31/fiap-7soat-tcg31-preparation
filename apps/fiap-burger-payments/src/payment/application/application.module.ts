import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { CreatePaymentHandler } from './commands/create-payment.handler';

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [CreatePaymentHandler],
})
export class ApplicationModule {}
