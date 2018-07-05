'use strict';

import { handleActions } from 'redux-actions';
import actionTypes from '../constants/action-types';

export default handleActions({

  [actionTypes.INFO_CLEAR] : {
    next : () => null
  },

  [actionTypes.INFO_SHOW] : {
    next : (state, action) => action.payload
  },

}, null);