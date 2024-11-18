import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';
import { RequestPreparationController } from './request-preparation.controller';

const HttpDrivers = [RequestPreparationController];
const AmqpDrivers = [];

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [...HttpDrivers],
  providers: [...AmqpDrivers],
})
export class DriversModule {}
