import { MongooseEntitySchema } from '@fiap-burger/tactical-design/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Payments' })
export class MongoosePaymentSchema extends MongooseEntitySchema {
  @Prop()
  type: string;

  @Prop()
  amount: number;

  @Prop()
  status: string;
}

export const MongoosePaymentSchemaModel = SchemaFactory.createForClass(
  MongoosePaymentSchema,
);
