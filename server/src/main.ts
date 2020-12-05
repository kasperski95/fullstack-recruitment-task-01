import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { generateSchema } from './utils/generate-schema';
import { Logger } from './utils/logger';

const PORT = process.env.PORT || 4000;

(async function main() {
  Logger.init(`${__dirname}/../logs`, 'last.log');
  const logger = new Logger().setLabel('main');

  try {
    const apolloServer = new ApolloServer({
      schema: await generateSchema(),
      playground: true,
      logger: new Logger().setLabel('apollo'),
    });

    // server
    const app = express();
    app.use(cors());
    app.use(express.json());
    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);
    httpServer.listen({ port: PORT }, () =>
      console.log(
        `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
      )
    );
  } catch (error) {
    logger.error(error);
  }
})();
