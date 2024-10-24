import { Entity } from '@fiap-burger/tactical-design/core';

export class Payment extends Entity {
  constructor(
    protected readonly _id: string,
    private readonly _type: string,
    private readonly _amount: number,
    private readonly _status: string,
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
}
