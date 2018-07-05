'use strict';

import React                     from 'react';
import PropTypes                 from 'prop-types';
import { connect }   from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FlashOffIcon from '@material-ui/icons/FlashOff';

import { getOnline } from '../../selectors/dialogs';

const DialogOffline = ({ online }) => (
  <Dialog
    open={!online}
    disableBackdropClick
    disableEscapeKeyDown
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title"><FlashOffIcon/> Offline</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You are not connected
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

DialogOffline.propTypes = {
  online : PropTypes.bool.isRequired
};

const mapStateToProps = () => {
  return (state) => ({
    online : getOnline(state)
  });
};

export default connect(
  mapStateToProps,
)(DialogOffline);
