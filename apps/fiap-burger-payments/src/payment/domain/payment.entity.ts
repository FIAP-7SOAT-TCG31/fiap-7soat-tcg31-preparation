import { AggregateRoot } from '@fiap-burger/tactical-design/core';
import { PaymentCreated } from './events/payment.created';

export class Payment extends AggregateRoot {
  constructor(
    protected readonly _id: string,
    private readonly _type: string,
    private readonly _amount: number,
    private _status: string,
  ) {
    super(_id);
  }

  get type() {
    return this._type;
  }

  get amount() {
    return this._amount;
  }

  get status() {
    return this._status;
  }

  create() {
    this.apply(new PaymentCreated(this.id, this.type, this.amount));
  }

  onPaymentCreated() {
    this._status = 'created';
  }
}
