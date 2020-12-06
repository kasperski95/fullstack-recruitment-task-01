import redis, { RedisClient } from 'redis';
import { v4 as uuid } from 'uuid';
import { EntityBase } from '../abstractions/entity-base';
import { Type } from './typescript';

export class InMemoryDatabase {
  client: RedisClient;
  constructor() {
    this.client = redis.createClient();
  }

  getRepository<T extends EntityBase<T>>(EntityType: Type<T>) {
    return new Repository<T>(this.client, EntityType);
  }
}

class Repository<T extends EntityBase<T> & { [key: string]: any }> {
  private collectionName: string;
  constructor(private client: RedisClient, private EntityType: Type<T>) {
    this.collectionName = this.EntityType.name;
  }

  findAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.client.hgetall(this.collectionName, (err, val) => {
        if (err) {
          reject(err);
        } else {
          if (!val) resolve([]);
          else {
            resolve(
              Object.values(val).map((stringified) => {
                return new this.EntityType().buildFromStrings(
                  JSON.parse(stringified)
                );
              })
            );
          }
        }
      });
    });
  }

  findOne(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.hget(this.collectionName, id, (err, val) => {
        if (err) {
          reject(err);
        } else {
          resolve(new this.EntityType().buildFromStrings(JSON.parse(val)));
        }
      });
    });
  }

  save(entity: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const key = entity.id || uuid();
      // @ts-ignore
      const newEntity = entity.copyWith({ id: key });
      this.client.hset(
        this.collectionName,
        key,
        JSON.stringify(newEntity),
        (err) => {
          if (err) reject(err);
          else resolve(newEntity);
        }
      );
    });
  }
}
