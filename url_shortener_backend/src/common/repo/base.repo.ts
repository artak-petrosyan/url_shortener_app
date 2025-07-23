import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Repo } from './repo.interface';

interface RepoObject {
  id: string | number;
}

export abstract class BaseRepostitory<T extends RepoObject> implements Repo<T> {
  protected repo: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.repo = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.repo.save(data);
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repo.save(data);
  }

  public create(data: DeepPartial<T>): T {
    return this.repo.create(data);
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.repo.create(data);
  }

  public async findOneById(id: string): Promise<T | null> {
    return await this.repo.findOneBy({ id: id } as FindOptionsWhere<T>);
  }

  public async findByCondition(
    filterCondition: FindOneOptions<T>,
  ): Promise<T | null> {
    return await this.repo.findOne(filterCondition);
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.repo.find(relations);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repo.find(options);
  }

  public async remove(data: T): Promise<T> {
    return await this.repo.remove(data);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T | undefined> {
    return await this.repo.preload(entityLike);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repo.findOne(options);
  }
}
