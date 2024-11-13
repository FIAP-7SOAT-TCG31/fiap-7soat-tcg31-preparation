import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentProvider } from '../../../application/abstractions/payment.provider';
import PIX from './pix';

@Injectable()
export class FakePixService implements PaymentProvider {
  private generateConciliationId() {
    const [, baseId] = randomUUID().split('-');
    const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 16);
    return `${timestamp}${baseId}`;
  }
  async createPixQRCode(
    amount: number,
  ): Promise<{ conciliationId: string; content: string }> {
    const conciliationId = this.generateConciliationId();
    const transaction = new PIX({
      pixkey: 'payments@fiapburger.com.br',
      merchant: 'Fiap Burger',
      city: 'São Paulo',
      code: conciliationId,
      amount,
    });

    return {
      conciliationId,
      content: transaction.payload(),
    };
  }
}
