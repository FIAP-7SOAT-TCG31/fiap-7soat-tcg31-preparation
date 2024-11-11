import { DomainEvent } from '@fiap-burger/tactical-design/core';

export class PaymentRejected extends DomainEvent {
  constructor(public readonly id: string) {
    super();
  }
}
