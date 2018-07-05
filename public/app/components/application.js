'use strict';

import React         from 'react';
import StoreProvider from './base/store-provider';
import DialogOffline from './base/dialog-offline';
import DialogError   from './base/dialog-error';
import DialogInfo    from './base/dialog-info';

const Application = () => (
  <StoreProvider>
    <React.Fragment>
      <DialogOffline />
      <DialogError />
      <DialogInfo />
      Hello!
    </React.Fragment>
  </StoreProvider>
);

export default Application;