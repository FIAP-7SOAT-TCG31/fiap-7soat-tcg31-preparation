import { MongooseEntitySchema } from '@fiap-burger/tactical-design/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class MongoosePaymentInstructionSchema {
  @Prop()
  type: string;

  @Prop()
  content: string;
}

@Schema({ collection: 'Payments' })
export class MongoosePaymentSchema extends MongooseEntitySchema {
  @Prop()
  amount: number;

  @Prop()
  status: string;

  @Prop()
  type: string;

  @Prop({ schema: MongoosePaymentInstructionSchema })
  paymentInstruction: MongoosePaymentInstructionSchema;
}

export const MongoosePaymentSchemaModel = SchemaFactory.createForClass(
  MongoosePaymentSchema,
);
