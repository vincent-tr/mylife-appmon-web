'use strict';

import { createAction } from 'redux-actions';
import actionTypes from '../constants/action-types';

export const ioOnlineSet = createAction(actionTypes.ONLINE_SET);

const messagesToActions = {
  'object-add'       : createAction(actionTypes.OBJECT_ADD),
  'object-remove'    : createAction(actionTypes.OBJECT_REMOVE),
  'object-attribute' : createAction(actionTypes.OBJECT_ATTRIBUTE),
  'agent-add'        : createAction(actionTypes.AGENT_ADD),
  'agent-remove'     : createAction(actionTypes.AGENT_REMOVE)
};

export const ioMessage = msg => {
  const { msgtype, ...payload } = msg;
  const action = messagesToActions[msgtype];
  if(!action) {
    throw new Error(`Unknown message type : '${msgtype}'`);
  }
  return action(payload);
};
