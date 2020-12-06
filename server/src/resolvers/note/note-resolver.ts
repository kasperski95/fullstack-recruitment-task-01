import { ApolloError } from 'apollo-server-express';
import Dayjs from 'dayjs';
import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Note, NoteBuilder } from '../../models/entities/note';
import { Context } from '../../types';
import { CreateNoteInput } from './note-input';

@Resolver((of) => Note)
export class NoteResolver {
  constructor() {}

  @Query((returns) => Note)
  async note(@Ctx() { db }: Context, @Arg('id') id: string) {
    const repo = db.getRepository(Note);
    return repo.findOne(id);
  }

  @Query((returns) => [Note])
  async notes(
    @Ctx() { db }: Context,
    @Arg('first') count: number,
    @Arg('after', { nullable: true }) cursor?: string
  ) {
    const repo = db.getRepository(Note);

    const notes = (await repo.findAll()).sort((lhs, rhs) => {
      const lhsDate = Dayjs(lhs.date);
      const rhsDate = Dayjs(rhs.date);
      if (lhsDate.isSame(rhsDate, 'ms')) {
        return lhs.id.localeCompare(rhs.id);
      } else return Dayjs(lhs.date).isBefore(Dayjs(rhs.date), 'ms') ? 1 : -1;
    });

    if (notes.length === 0) return notes;

    if (cursor) {
      const startIndex = cursor
        ? notes.findIndex(({ id }) => id === cursor)
        : 0;
      if (startIndex < 0) throw new ApolloError('Could not find "after".');
      return notes.splice(startIndex + 1, count);
    } else {
      return notes.splice(0, count);
    }
  }

  @Mutation((returns) => Note)
  async createNote(@Ctx() { db }: Context, @Arg('data') data: CreateNoteInput) {
    const repo = db.getRepository(Note);
    return repo.save(new NoteBuilder(data).build());
  }

  @Mutation((returns) => Number)
  async deleteNote(
    @Ctx() { db }: Context,
    @Arg('id', (type) => ID) id: string
  ) {
    const repo = db.getRepository(Note);
    await repo.delete(id);
    return 1;
  }
}
