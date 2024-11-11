import { DomainEvent } from '@fiap-burger/tactical-design/core';

export class PaymentApproved extends DomainEvent {
  constructor(public readonly id: string) {
    super();
  }
}
