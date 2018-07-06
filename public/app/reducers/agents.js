'use strict';

import { handleActions } from 'redux-actions';
import actionTypes from '../constants/action-types';
import Immutable from 'immutable';

function updateObjects(state, action, updater) {
  const agentId = action.payload.agent;
  return state.update(agentId, agent => ({
    ...agent,
    objects : updater(agent.objects)
  }));
}

export default handleActions({

  [actionTypes.ONLINE_SET] : {
    next : (state, action) => {
      if(action.payload) { return state; }
      // disconnection
      return state.clear();
    }
  },

  [actionTypes.AGENT_ADD] : {
    next : (state, action) => {
      const agentId = action.payload.agent;
      return state.set(agentId, {
        agentId,
        objects : Immutable.Map()
      });
    }
  },

  [actionTypes.AGENT_REMOVE] : {
    next : (state, action) => {
      const agentId = action.payload.agent;
      return state.delete(agentId);
    }
  },

  [actionTypes.OBJECT_ADD] : {
    next : (state, action) => {
      const { descriptor } = action.payload;
      const { name } = descriptor;
      return updateObjects(state, action, objects => objects.set(name, {
        descriptor,
        object : {}
      }));
    }
  },

  [actionTypes.OBJECT_REMOVE] : {
    next : (state, action) => {
      const { name } = action.payload;
      return updateObjects(state, action, objects => objects.delete(name));
    }
  },

  [actionTypes.OBJECT_ATTRIBUTE] : {
    next : (state, action) => {
      const { name, member, value } = action.payload;
      return updateObjects(state, action, objects => objects.update(name, obj => ({
        ...obj,
        object : {
          ... obj.object,
          [member] : value
        }
      })));
    }
  },

}, Immutable.Map());
