import { Field, ObjectType } from 'type-graphql';
import { ActionType } from '../constants/actions';

@ObjectType()
export class Action {
  @Field()
  action: ActionType;

  @Field({ nullable: true })
  payload?: string;
}

export class ActionBuilder {
  private action: Action;

  constructor(data: { actionType: ActionType; payload?: string }) {
    this.action = new Action();
    this.action.action = data.actionType;
    this.action.payload = data.payload;
  }

  build() {
    return this.action;
  }
}
