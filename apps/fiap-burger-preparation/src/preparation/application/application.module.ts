import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { RequestPreparationHandler } from './commands/request-preparation.handler';

const QueryHandlers = [];
const CommandHandlers = [RequestPreparationHandler];

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class ApplicationModule {}
