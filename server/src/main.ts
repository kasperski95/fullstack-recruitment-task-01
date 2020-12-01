import { ApolloServer } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import 'reflect-metadata';
import { createConnection, getConnectionOptions, getRepository } from 'typeorm';
import { generateJWT } from './auth/jwt';
import { User } from './models/entities/user';
import { Context } from './utils/context';
import { generateSchema } from './utils/generate-schema';
import { Loaders } from './utils/loaders';
import { Logger } from './utils/logger';
import { mapAuthorizationToUserId } from './utils/map-authorization-to-user-id';
import { SingleDataLoader } from './utils/single-data-loader';

const PORT = process.env.PORT || 4000;

(async function main() {
  Logger.init(`${__dirname}/../logs`, 'last.log');
  const logger = new Logger().setLabel('main');

  try {
    // typeorm
    const connectionOptions = await getConnectionOptions();
    await createConnection({
      ...connectionOptions,
      logger: new Logger().setLabel('typeorm'),
    });

    const apolloServer = new ApolloServer({
      schema: await generateSchema(),
      playground: true,
      context: (ctx) => {
        const isSubscription = !ctx.req || !ctx.req.headers;

        const token = isSubscription
          ? ctx.connection.context.authorization // fixes context in subscriptions
          : ctx.req?.headers?.authorization;

        const result = new Context(
          new Loaders(new SingleDataLoader()),
          mapAuthorizationToUserId(token)
        );

        return result;
      },
      logger: new Logger().setLabel('apollo'),
      subscriptions: {
        path: '/subscriptions',
      },
    });

    // server
    const app = express();
    app.use(cors());
    app.use(express.json());
    apolloServer.applyMiddleware({ app });

    app.use('/static', express.static(path.join(__dirname, '../public')));

    app.post('/v1/auth', async (req, res) => {
      try {
        const email = req.body.email;
        logger.info(`authorizing user (${email})`);
        const user = await getRepository(User).findOne({
          email,
        });
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send(generateJWT(user));
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ password: 'INVALID_PASSWORD' });
          }
        } else {
          res.status(StatusCodes.NOT_FOUND).json({ email: 'EMAIL_NOT_FOUND' });
        }
      } catch (err) {
        res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        logger.error((err as Error).message, err);
      }
    });

    const httpServer = createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    httpServer.listen({ port: PORT }, () =>
      console.log(
        `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
      )
    );
  } catch (error) {
    logger.error(error);
  }
})();
