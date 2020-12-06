import { loremIpsum } from 'lorem-ipsum';
import { Note, NoteBuilder } from './models/entities/note';
import { InMemoryDatabase } from './utils/in-memory-database';

(async function main() {
  try {
    const db = new InMemoryDatabase();
    const noteRepo = db.getRepository(Note);

    for (let i = 0; i < 25; i++) {
      await noteRepo.save(
        new NoteBuilder({
          content: loremIpsum({
            count: 2,
            sentenceLowerBound: 10,
            sentenceUpperBound: 100,
          }),
        }).build()
      );
    }
  } catch (err) {
    console.error(err);
  }
  process.exit();
})();
