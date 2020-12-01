import { Action } from './action';

export class ActionPayload {
  constructor(public userIds: string[] | 'EVERYONE', public action: Action) {}
}
