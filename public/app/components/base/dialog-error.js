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
import CancelIcon        from '@material-ui/icons/Cancel';

import { getError }   from '../../selectors/dialogs';
import { clearError } from '../../actions/dialogs';

const DialogError = ({ error, onClose }) => (
  <Dialog
    open={!!error}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title"><CancelIcon /> Error</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {error && error.toString()}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>OK</Button>
    </DialogActions>
  </Dialog>
);

DialogError.propTypes = {
  error   : PropTypes.object,
  onClose : PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return (state) => ({
    error : getError(state)
  });
};

const mapDispatchToProps = (dispatch) => ({
  onClose : () => dispatch(clearError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogError);
