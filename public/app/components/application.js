'use strict';

import React                 from 'react';
import StoreProvider         from './base/store-provider';

const Application = () => (
  <StoreProvider>
    <React.Fragment>
      Hello!
    </React.Fragment>
  </StoreProvider>
);

export default Application;