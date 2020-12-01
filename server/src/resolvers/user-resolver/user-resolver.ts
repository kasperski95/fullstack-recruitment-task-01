import { ApolloError } from 'apollo-server-express';
import StatusCodes from 'http-status-codes';
import { Ctx, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User } from '../../models/entities/user';
import { Context } from '../../utils/context';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userRepository = getRepository(User)) {}

  @Query((returns) => User)
  async me(@Ctx() ctx: Context) {
    if (!ctx.userId)
      throw new ApolloError(
        StatusCodes.getStatusText(StatusCodes.BAD_REQUEST),
        StatusCodes.BAD_REQUEST.toString()
      );
    const user = await this.userRepository.findOne(ctx.userId);
    if (user)
      throw new ApolloError(
        StatusCodes.getStatusText(StatusCodes.NOT_FOUND),
        StatusCodes.NOT_FOUND.toString()
      );
    return user;
  }
}
