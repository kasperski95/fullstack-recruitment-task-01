import { Note } from '@src/models/note';
import { loremIpsum } from 'lorem-ipsum';

export const state = {
  notes: [...Array.from(Array(100).keys())].map((i) => {
    return {
      id: i.toString(), //uuid(),
      date: new Date(),
      content: loremIpsum({
        count: 2,
        sentenceLowerBound: 10,
        sentenceUpperBound: 100,
      }),
    } as Note;
  }),
};
