import { ApolloError } from 'apollo-server-express';
import StatusCodes from 'http-status-codes';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User, UserBuilder, UserRoles } from '../../models/entities/user';
import { Context } from '../../utils/context';
import { CreateUserArgs } from './user-args';

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
    if (!user)
      throw new ApolloError(
        StatusCodes.getStatusText(StatusCodes.NOT_FOUND),
        StatusCodes.NOT_FOUND.toString()
      );
    return user;
  }

  @Mutation((returns) => User)
  async createUser(@Ctx() ctx: Context, @Arg('data') data: CreateUserArgs) {
    const usersWithThatEmailCount = await this.userRepository.count({
      where: { email: data.email },
    });

    if (usersWithThatEmailCount > 0) {
      throw new ApolloError(
        'User with that email already exists.',
        StatusCodes.UNPROCESSABLE_ENTITY.toString()
      );
    }

    return this.userRepository.save(
      new UserBuilder({
        email: data.email,
        password: data.password,
        role: UserRoles.default,
      }).build()
    );
  }
}
