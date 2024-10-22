import { Entity } from './entity';

export interface Repository<TEntity extends Entity> {
  create(entity: TEntity): Promise<void>;
  update(entity: TEntity): Promise<void>;
  findById(id: string): Promise<TEntity>;
  findAll(): Promise<TEntity[]>;
}
