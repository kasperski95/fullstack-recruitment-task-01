import * as moment from 'moment';
type DatabaseDateString = string;

export function convertToDatabaseDateString(date: Date): DatabaseDateString {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}
