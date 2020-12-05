import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateNoteInput {
  @Field()
  content: string;
}
