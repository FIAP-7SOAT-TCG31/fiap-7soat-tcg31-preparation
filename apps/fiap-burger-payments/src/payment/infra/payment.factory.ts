import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PaymentFactory } from '../application/abstractions/payment.factory';
import { PaymentRepository } from '../application/abstractions/payment.repository';
import { Payment } from '../domain/payment.entity';

@Injectable()
export class MongoosePaymentFactory implements PaymentFactory {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async create(type: string, amount: number): Promise<Payment> {
    const payment = new Payment(
      new Types.ObjectId().toHexString(),
      type,
      amount,
      'draft',
    );
    payment.create();
    await this.paymentRepository.create(payment);
    return payment;
  }
}
