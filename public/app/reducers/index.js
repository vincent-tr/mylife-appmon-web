'use strict';

import { combineReducers } from 'redux';

import online  from './online';
import errors  from './errors';
import info    from './info';
import agents  from './agents';

export default combineReducers({
  online,
  errors,
  info,
  agents,
});