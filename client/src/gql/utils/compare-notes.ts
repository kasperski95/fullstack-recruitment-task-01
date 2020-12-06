import { Note } from '@src/models/note';
import Dayjs from 'dayjs';

export function compareNotes(lhs: Note, rhs: Note) {
  const lhsDate = Dayjs(lhs.date);
  const rhsDate = Dayjs(rhs.date);
  if (lhsDate.isSame(rhsDate, 'ms')) {
    return lhs.id.localeCompare(rhs.id);
  } else return Dayjs(lhs.date).isBefore(Dayjs(rhs.date), 'ms') ? 1 : -1;
}
