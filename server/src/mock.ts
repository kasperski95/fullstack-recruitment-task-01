import { createConnection, getConnectionOptions } from 'typeorm';
import { Logger } from './utils/logger';
import { mockDatabase } from './utils/mock-database';

(async function main() {
  Logger.init('../logs', 'mock.log');
  const logger = new Logger().setLabel('mock');
  try {
    const connectionOptions = await getConnectionOptions();
    await createConnection({
      ...connectionOptions,
      synchronize: true,
      logger: new Logger().setLabel('typeorm'),
    });
    await mockDatabase();
  } catch (err) {
    logger.error(err);
  }
})();
