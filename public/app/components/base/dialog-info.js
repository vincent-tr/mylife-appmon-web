'use strict';

import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Button            from '@material-ui/core/Button';
import Dialog            from '@material-ui/core/Dialog';
import DialogActions     from '@material-ui/core/DialogActions';
import DialogContent     from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle       from '@material-ui/core/DialogTitle';
import InfoIcon          from '@material-ui/icons/Info';

import { getInfo }   from '../../selectors/dialogs';
import { clearInfo } from '../../actions/dialogs';

const DialogInfo = ({ info, onClose }) => (
  <Dialog
    open={!!info}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title"><InfoIcon /> Info</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {info}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>OK</Button>
    </DialogActions>
  </Dialog>
);

DialogInfo.propTypes = {
  info    : PropTypes.object,
  onClose : PropTypes.func.isRequired
};
const mapStateToProps = () => {
  return (state) => ({
    info : getInfo(state)
  });
};

const mapDispatchToProps = (dispatch) => ({
  onClose : () => dispatch(clearInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogInfo);
