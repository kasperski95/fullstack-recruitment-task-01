import {
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { ActionType } from '../constants/actions';
import { Action, ActionBuilder } from '../models/action';
import { ActionPayload } from '../models/action-container';
import { Context } from '../utils/context';

@Resolver((of) => Action)
export class ActionSubscription {
  @Subscription((returns) => Action, {
    topics: [ActionType.test],
    filter: ({ payload, args, context }) => {
      if (payload instanceof ActionPayload) {
        if (payload.userIds === 'EVERYONE') return true;
        if (payload.userIds.includes(context.userId)) return true;
      }
      return false;
    },
  })
  newAction(@Root() actionContainer: ActionPayload): Action {
    return actionContainer.action;
  }

  /**
   * TODO: delete me
   */
  @Mutation((returns) => Action)
  async dispatchTestAction(
    @Ctx() ctx: Context,
    @PubSub(ActionType.test)
    publish: Publisher<ActionPayload>
  ) {
    const action = new ActionBuilder({
      actionType: ActionType.test,
    }).build();
    await publish(new ActionPayload('EVERYONE', action));
    return action;
  }
}
