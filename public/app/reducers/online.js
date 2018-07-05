'use strict';

import { handleActions } from 'redux-actions';
import actionTypes from '../constants/action-types';

export default handleActions({

  [actionTypes.ONLINE_SET] : {
    next : (state, action) => action.payload
  },

}, false);