import { Note } from '@src/models/note';
import { loremIpsum } from 'lorem-ipsum';
import { v4 as uuid } from 'uuid';

export const state = {
  notes: [...Array.from(Array(0).keys())].map((i) => {
    return {
      id: uuid(),
      date: new Date(),
      content: loremIpsum({
        count: 2,
        sentenceLowerBound: 10,
        sentenceUpperBound: 100,
      }),
    } as Note;
  }),
};
