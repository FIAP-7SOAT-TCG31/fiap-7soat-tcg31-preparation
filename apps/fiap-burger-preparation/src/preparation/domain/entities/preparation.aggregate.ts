import { AggregateRoot } from '@fiap-burger/tactical-design/core';
import { PreparationCompleted } from '../events/preparation-completed.event';
import { PreparationRequested } from '../events/preparation-requested.event';
import { PreparationStarted } from '../events/preparation-started.event';
import { PreparationStatus } from '../values/preparation-status.value';

export class Preparation extends AggregateRoot {
  constructor(
    protected readonly _id: string,
    private readonly _description: string,
    private readonly _items: string[],
    private readonly _status: PreparationStatus,
    private _requestedAt: Date,
    private _startedAt: Date,
    private _completedAt: Date,
  ) {
    super(_id);
  }

  get description() {
    return this._description;
  }

  get items() {
    return this._items.map((x) => x);
  }

  get status() {
    return this._status;
  }

  get requestedAt() {
    return this._requestedAt;
  }

  get startedAt() {
    return this._startedAt;
  }

  get completedAt() {
    return this._completedAt;
  }

  request() {
    this.apply(new PreparationRequested());
  }

  onPreparationRequested({ requestedAt }: PreparationRequested) {
    this._requestedAt = requestedAt;
  }

  start() {
    this.apply(new PreparationStarted());
  }

  onPreparationStarted({ startedAt }: PreparationStarted) {
    this._startedAt = startedAt;
  }

  complete() {
    this.apply(new PreparationCompleted());
  }

  onPreparationCompleted({ completedAt }: PreparationCompleted) {
    this._completedAt = completedAt;
  }
}
