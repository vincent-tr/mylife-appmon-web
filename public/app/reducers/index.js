'use strict';

import { combineReducers } from 'redux';

import online  from './online';
import errors  from './errors';
import info    from './info';

export default combineReducers({
  online,
  errors,
  info,
});