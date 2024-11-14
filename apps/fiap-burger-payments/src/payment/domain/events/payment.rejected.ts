import { DomainEvent } from '@fiap-burger/tactical-design/core';

export class PaymentRejected extends DomainEvent {
  public readonly rejectedAt = new Date();
}
