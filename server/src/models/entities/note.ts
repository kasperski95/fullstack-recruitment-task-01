import { Field, ID, ObjectType } from 'type-graphql';
import { Builder } from '../../abstractions/builder';

@ObjectType()
export class Note {
  getKey = () => this.id.toString();

  @Field((type) => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  date: Date;
}

export class NoteBuilder extends Builder<Note> {
  private note: Note;
  constructor(data: { content: string }) {
    super();
    this.note = new Note();
    this.note.content = data.content;
    this.note.date = new Date();
  }

  build(): Note {
    return this.note;
  }
}
