import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../../../application/abstractions/payment.provider';
import PIX from './pix';

@Injectable()
export class FakePixService implements PaymentProvider {
  async createPixQRCode(
    conciliationId: string,
    amount: number,
  ): Promise<string> {
    const transaction = new PIX({
      pixkey: 'payments@fiapburger.com.br',
      merchant: 'Fiap Burger',
      city: 'São Paulo',
      code: conciliationId,
      amount,
    });

    return transaction.payload();
  }
}
