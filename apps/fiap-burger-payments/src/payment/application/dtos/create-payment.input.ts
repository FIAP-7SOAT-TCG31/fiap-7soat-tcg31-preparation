import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentInput {
  @IsString()
  type: string;

  @IsNumber()
  amount: number;
}

export class CreatePaymentOutput {
  id: string;
}
