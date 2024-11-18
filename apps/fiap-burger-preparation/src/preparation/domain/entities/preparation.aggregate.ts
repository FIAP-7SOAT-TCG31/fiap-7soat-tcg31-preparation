import { AggregateRoot } from '@fiap-burger/tactical-design/core';
import { PreparationCompleted } from '../events/preparation-completed.event';
import { PreparationRequested } from '../events/preparation-requested.event';
import { PreparationStarted } from '../events/preparation-started.event';
import {
  EPreparationStatus,
  PreparationStatus,
} from '../values/preparation-status.value';

export class Preparation extends AggregateRoot {
  constructor(
    protected readonly _id: string,
    private readonly _description: string,
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

  getWaitTime() {
    if (!this.requestedAt) {
      throw new Error('Cannot get wait time for drafted preparation');
    }
    let end = new Date();
    if (this.status.value === EPreparationStatus.Completed) {
      end = this._completedAt;
    }

    return end.getTime() - this._requestedAt.getTime() / 1000;
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
