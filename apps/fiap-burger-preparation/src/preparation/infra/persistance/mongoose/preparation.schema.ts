import { MongooseEntitySchema } from '@fiap-burger/tactical-design/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PreparationStatusValues } from '../../../domain/values/preparation-status.value';

@Schema({ collection: 'Preparations', timestamps: true })
export class MongoosePreparationSchema extends MongooseEntitySchema {
  @Prop()
  description: string;

  @Prop({ type: [String] })
  items: string[];

  @Prop({ type: String })
  status: PreparationStatusValues;

  @Prop()
  requestedAt?: Date;

  @Prop()
  startedAt?: Date;

  @Prop()
  completedAt?: Date;
}

export const MongoosePreparationSchemaModel = SchemaFactory.createForClass(
  MongoosePreparationSchema,
);
