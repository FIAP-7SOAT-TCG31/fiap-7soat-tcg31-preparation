import { IsNumber, IsString } from 'class-validator';

export class DraftPaymentInput {
  @IsString()
  type: string;

  @IsNumber()
  amount: number;
}

export class DraftPaymentOutput {
  id: string;
}
