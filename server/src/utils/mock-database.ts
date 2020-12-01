import { getRepository } from 'typeorm';
import { User, UserBuilder, UserRoles } from '../models/entities/user';

export async function mockDatabase() {
  const userRepository = getRepository(User);

  const users = {
    johnDoe: new UserBuilder({
      email: 'user@gmail.com',
      password: 'foobar',
      role: UserRoles.default,
    }).build(),
  };
  users.johnDoe = await userRepository.save(users.johnDoe);
}
