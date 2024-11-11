import { DomainEvent } from '@fiap-burger/tactical-design/core';

export class PaymentCreated extends DomainEvent {
  constructor(
    public readonly type: string,
    public readonly amount: number,
  ) {
    super();
  }
}
