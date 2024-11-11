import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';
import { CreatePaymentController } from './create-payment.controller';
import { LogAllEventsController } from './log-all-events.controller';
import { OnPaymentDraftedCreatePaymentController } from './on-payment-drafted-create-payment.controller';

@Module({
  imports: [CqrsModule, ApplicationModule],
  providers: [LogAllEventsController, OnPaymentDraftedCreatePaymentController],
  controllers: [CreatePaymentController],
})
export class DriversModule {}
