import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';
import { CreatePaymentController } from './create-payment.controller';

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [CreatePaymentController],
})
export class DriversModule {}
