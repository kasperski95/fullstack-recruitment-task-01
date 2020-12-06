import Dayjs from 'dayjs';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
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
  async notes(@Ctx() { db }: Context) {
    const repo = db.getRepository(Note);
    return (await repo.findAll()).sort((lhs, rhs) => {
      const lhsDate = Dayjs(lhs.date);
      const rhsDate = Dayjs(rhs.date);
      if (lhsDate.isSame(rhsDate, 'ms')) {
        return lhs.id.localeCompare(rhs.id);
      } else return Dayjs(lhs.date).isBefore(Dayjs(rhs.date), 'ms') ? 1 : -1;
    });
  }

  @Mutation((returns) => Note)
  async createNote(@Ctx() { db }: Context, @Arg('data') data: CreateNoteInput) {
    const repo = db.getRepository(Note);
    return repo.save(new NoteBuilder(data).build());
  }

  @Mutation((returns) => Number)
  async deleteNote(@Ctx() { db }: Context, @Arg('id') id: string) {
    const repo = db.getRepository(Note);
    await repo.delete(id);
    return 1;
  }
}
