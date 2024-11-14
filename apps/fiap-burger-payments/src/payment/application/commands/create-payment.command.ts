import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from '../dtos/create-payment.input';

export class CreatePaymentCommand {
  constructor(readonly data: CreatePaymentInput) {}
}

export class CreatePaymentResult {
  constructor(readonly data: CreatePaymentOutput) {}
}
