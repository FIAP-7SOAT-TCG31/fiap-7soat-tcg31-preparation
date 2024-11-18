import { DomainEvent } from '@fiap-burger/tactical-design/core';

export class PaymentApproved extends DomainEvent {
  public readonly approvedAt = new Date();
}
