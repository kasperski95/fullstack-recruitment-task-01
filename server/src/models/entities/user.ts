import * as bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  Entity as EntityDecorator,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Builder } from '../../abstractions/builder';
import { Entity } from '../../abstractions/entity';
import { SALT_LENGTH } from '../../constants/config';

export enum UserRoles {
  default = 'default',
}

@ObjectType()
@EntityDecorator()
export class User extends Entity {
  getKey = () => this.id.toString();

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: string;

  @Field()
  @Column()
  @Index({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column('text')
  role: UserRoles;
}

export class UserBuilder extends Builder<User> {
  private user: User;
  constructor(data: { email: string; password: string; role: UserRoles }) {
    super();
    this.user = new User();
    this.user.email = data.email;
    this.user.password = bcrypt.hashSync(data.password, SALT_LENGTH);
    this.user.role = data.role;
  }

  build(): User {
    return this.user;
  }
}
