import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Note, NoteBuilder } from '../../models/entities/note';
import { CreateNoteInput } from './note-input';

@Resolver((of) => Note)
export class NoteResolver {
  @Query((returns) => Note)
  async note(@Arg('id') id: string) {
    return new NoteBuilder({ content: 'foo' }).build();
  }

  @Query((returns) => [Note])
  async notes() {
    return [new NoteBuilder({ content: 'foo' }).build()];
  }

  @Mutation((returns) => Note)
  async createUser(@Arg('data') data: CreateNoteInput) {}
}
