'use strict';

import React       from 'react';
import PropTypes   from 'prop-types';

import List     from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

import Item from './item';

class ItemWithNested extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { items, ...props } = this.props;
    return (
      <React.Fragment>
        <Item
          onClick={this.handleClick}
          showExpandLess={this.state.open}
          showExpandMore={!this.state.open}
          {...props} />
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

ItemWithNested.propTypes = {
  items : PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
};
export default ItemWithNested;