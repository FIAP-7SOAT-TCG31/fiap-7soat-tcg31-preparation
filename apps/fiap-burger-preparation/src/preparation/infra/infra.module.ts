import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreparationRepository } from '../application/abstractions/preparation.repository';
import { MongoosePreparationSchemaFactory } from './persistance/mongoose/preparation-schema.factory';
import { MongoosePreparationRepository } from './persistance/mongoose/preparation.repository';
import {
  MongoosePreparationSchema,
  MongoosePreparationSchemaModel,
} from './persistance/mongoose/preparation.schema';

const MongooseSchemaModule = MongooseModule.forFeature([
  {
    name: MongoosePreparationSchema.name,
    schema: MongoosePreparationSchemaModel,
  },
]);

MongooseSchemaModule.global = true;

@Module({
  imports: [MongooseSchemaModule],
  providers: [
    MongoosePreparationSchemaFactory,
    {
      provide: PreparationRepository,
      useClass: MongoosePreparationRepository,
    },
  ],
  exports: [PreparationRepository],
})
export class InfraModule {}
