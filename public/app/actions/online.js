'use strict';

import { createAction } from 'redux-actions';
import actionTypes from '../constants/action-types';

export const ioOnlineSet = createAction(actionTypes.ONLINE_SET);