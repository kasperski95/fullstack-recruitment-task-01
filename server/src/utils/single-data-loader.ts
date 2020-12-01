import DataLoader from 'dataloader';
import { LRUMap } from 'lru_map';
import { createQueryBuilder } from 'typeorm';
import { Entity } from '../abstractions/entity';

export class SingleDataLoader {
  private loaders: { [key: string]: DataLoader<string, Entity> } = {};

  load<T extends Entity>(tableName: string, id: string | string) {
    const loader = this.findLoader(tableName);
    return loader.load(id as string) as Promise<T>;
  }

  private findLoader(tableName: string) {
    if (!this.loaders[tableName]) {
      this.loaders[tableName] = new DataLoader<string, Entity>(
        async (ids) => {
          const rows = await createQueryBuilder<Entity>(tableName)
            .addSelect('*')
            .whereInIds(ids)
            .getMany();

          const lookup = rows.reduce((acc, row) => {
            acc[row.getKey()] = row;
            return acc;
          }, {});

          return ids.map((id) => lookup[id] || null);
        },
        { cacheMap: new LRUMap(100) }
      );
    }
    return this.loaders[tableName];
  }
}
