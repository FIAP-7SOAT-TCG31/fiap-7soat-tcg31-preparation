import { Injectable } from '@nestjs/common';
import { Entity } from './entity';

export abstract class DomainEvent /* NOSONAR */ {}

export class AggregateEvent<T extends DomainEvent = DomainEvent> {
  constructor(
    public readonly id: string,
    public readonly aggregateId: string,
    public readonly eventName: string,
    public readonly timestamp: Date,
    public readonly version: number,
    public readonly data: T,
  ) {}
}

export interface AggregateContext {
  /**
   * Propagates the aggregate events to the configured contexts
   */
  commit(...events: AggregateEvent[]): Promise<void>;
}

export abstract class AggregatePersistanceContext implements AggregateContext {
  abstract commit(...events: AggregateEvent[]): Promise<void>;
}

export abstract class AggregatePublisherContext implements AggregateContext {
  abstract commit(...events: AggregateEvent[]): Promise<void>;
}

@Injectable()
export class AggregateMergeContext {
  constructor(
    private readonly persistance: AggregatePersistanceContext,
    private readonly publisher: AggregatePublisherContext,
  ) {}

  mergeObjectContext<T extends AggregateRoot>(object: T) {
    object['_contexts'].push(this.persistance, this.publisher);
    return object;
  }
}

export abstract class AggregateRoot extends Entity {
  private _version: number;
  private readonly _contexts: AggregateContext[] = [];
  private readonly _events: AggregateEvent[] = [];

  get version() {
    return this._version;
  }

  get events() {
    return this._events;
  }

  async commit(): Promise<void> {
    await this.commitAll(this._events);
    this.resetEvents();
  }

  protected async commitAll(events: AggregateEvent[]): Promise<void> {
    await Promise.all(this._contexts.map((x) => x.commit(...events)));
  }

  private resetEvents() {
    this._events.length = 0;
  }

  protected apply(...events: DomainEvent[]) {
    for (const event of events) {
      this.applyEvent(event);
      const aggregateEvent = new AggregateEvent(
        'draft',
        this._id,
        event.constructor.name,
        new Date(),
        this._version,
        event,
      );
      this._events.push(aggregateEvent);
    }
  }

  private applyEvent(event: DomainEvent) {
    const handler = `on${event.constructor.name}`;
    this[handler](event);
    this._version = (this._version ?? 0) + 1;
  }
}
