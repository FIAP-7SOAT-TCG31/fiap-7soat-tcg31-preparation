import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';
import { GetPreparationByIdController } from './get-preparation-by-id.controller';
import { RequestPreparationController } from './request-preparation.controller';

const HttpDrivers = [
  RequestPreparationController,
  GetPreparationByIdController,
];
const AmqpDrivers = [];

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [...HttpDrivers],
  providers: [...AmqpDrivers],
})
export class DriversModule {}
