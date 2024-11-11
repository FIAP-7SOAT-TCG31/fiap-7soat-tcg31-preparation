import { PaymentInstruction } from './payment-instruction.value';

export class PixQRCode extends PaymentInstruction {
  readonly type = 'PixQRCode';
  constructor(protected readonly _content: string) {
    super();
  }

  get content() {
    return this._content;
  }
}
