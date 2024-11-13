import { EntityFactory } from '@fiap-burger/tactical-design/core';
import { Payment } from '../../domain/entities/payment.aggregate';

export abstract class PaymentFactory implements EntityFactory<Payment> {
  abstract create(type: string, amount: number): Promise<Payment>;
}
