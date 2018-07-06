'use strict';

import React       from 'react';
import PropTypes   from 'prop-types';

import ListItem       from '@material-ui/core/ListItem';
import ListItemIcon   from '@material-ui/core/ListItemIcon';
import ListItemText   from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ExpandLess     from '@material-ui/icons/ExpandLess';
import ExpandMore     from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  nested1: {
    paddingLeft: theme.spacing.unit * 5,
  },
  nested2: {
    paddingLeft: theme.spacing.unit * 7,
  },
  nested3: {
    paddingLeft: theme.spacing.unit * 9,
  }
});

const Item = ({ classes, content, icon, onClick, showExpandLess, showExpandMore, nestedLevel }) => {
  return (
    <ListItem button={!!onClick} onClick={onClick} className={classes[`nested${nestedLevel}`] || null}>
      {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText inset primary={content} />
      {showExpandLess && <ExpandLess />}
      {showExpandMore && <ExpandMore />}
    </ListItem>
  );
};

Item.propTypes = {
  classes        : PropTypes.object.isRequired,
  content        : PropTypes.node,
  icon           : PropTypes.element,
  onClick        : PropTypes.func,
  showExpandLess : PropTypes.bool,
  showExpandMore : PropTypes.bool,
  nestedLevel    : PropTypes.number,
};

export default withStyles(styles)(Item);