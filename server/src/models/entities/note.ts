import { Field, ID, ObjectType } from 'type-graphql';
import { BuilderBase } from '../../abstractions/builder-base';
import { EntityBase } from '../../abstractions/entity-base';

@ObjectType()
export class Note extends EntityBase<Note> {
  constructor() {
    super();
  }

  copyWith = (data: Partial<Note>) => {
    const newNote = new Note();
    newNote.id = data.id || this.id;
    newNote.content = data.content || this.content;
    newNote.date = data.date || this.date;
    return newNote;
  };

  buildFromStrings = (data: { [key in keyof Note]: string }) => {
    const newNote = new Note();
    newNote.id = data.id;
    newNote.content = data.content;
    newNote.date = new Date(data.date);
    return newNote;
  };

  @Field((type) => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  date: Date;
}

export class NoteBuilder extends BuilderBase<Note> {
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
