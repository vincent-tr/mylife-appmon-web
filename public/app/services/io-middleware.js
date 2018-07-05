'use strict';

import io from 'socket.io-client';
//import { actionTypes } from '../constants';
import { ioOnlineSet } from '../actions/online';

export default (/*store*/) => next => {

  const socket = io();

  socket.on('connect',    () => next(ioOnlineSet(true)));
  socket.on('disconnect', () => next(ioOnlineSet(false)));

// socket.on('message', payload => next(ioDispatch(payload)));

  return action => {
    next(action);
/*
    if(action.type === 'toto') {
      socket.send(action.payload);
    }
*/
  };
};