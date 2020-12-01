import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}
