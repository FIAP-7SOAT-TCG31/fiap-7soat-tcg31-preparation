import { EntityFactory } from '@fiap-burger/tactical-design/core';
import { Payment } from '../../domain/payment.entity';

export abstract class PaymentFactory implements EntityFactory<Payment> {
  abstract create(type: string, amount: number): Promise<Payment>;
}
