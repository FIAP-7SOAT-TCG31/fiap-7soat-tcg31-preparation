import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';
import { ApprovePaymentController } from './approve-payment.controller';
import { CreatePaymentController } from './create-payment.controller';
import { LogAllEventsController } from './log-all-events.controller';
import { OnPaymentDraftedCreatePaymentController } from './on-payment-drafted-create-payment.controller';
import { RejectPaymentController } from './reject-payment.controller';

const HttpDrivers = [
  CreatePaymentController,
  ApprovePaymentController,
  RejectPaymentController,
];

const AmqpDrivers = [
  LogAllEventsController,
  OnPaymentDraftedCreatePaymentController,
];

@Module({
  imports: [CqrsModule, ApplicationModule],
  providers: [...AmqpDrivers],
  controllers: [...HttpDrivers],
})
export class DriversModule {}
