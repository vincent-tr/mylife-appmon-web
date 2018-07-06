'use strict';

import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AgentIcon from '@material-ui/icons/DesktopWindows';
import ObjectIcon from '@material-ui/icons/Widgets';
import AttributeIcon from '@material-ui/icons/Build';

import Item from './item';
import ItemWithNested from './item-with-nested';

import { getAgents } from '../../selectors/agents';

const AttributeItem = ({ attribute }) => (
  <Item
    content={
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Typography>{attribute.name}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography>{`${attribute.value}`}</Typography>
        </Grid>
      </Grid>
    }
    icon={<AttributeIcon />}
    nestedLevel={2} />
);

AttributeItem.propTypes = {
  attribute : PropTypes.object.isRequired
};

const ObjectItem = ({ object }) => (
  <ItemWithNested
    content={object.descriptor.name}
    icon={<ObjectIcon />}
    nestedLevel={1}
    items={attributes(object).map(attribute => (
      <AttributeItem key={attribute.id} attribute={attribute} />
    ))} />
);

ObjectItem.propTypes = {
  object : PropTypes.object.isRequired
};

const AgentItem = ({ agent }) => (
  <ItemWithNested
    content={agent.agentId}
    icon={<AgentIcon />}
    items={agent.objects.valueSeq().map(object => (
      <ObjectItem key={object.descriptor.name} object={object} />
    ))} />
);

AgentItem.propTypes = {
  agent : PropTypes.object.isRequired
};

function attributes({ descriptor, object }) {
  return Object.keys(descriptor.members)
    .filter(key => descriptor.members[key].type === 'attribute')
    .map(key => {
      const desc = descriptor.members[key];
      const value = object[key];
      return {
        id : key,
        name : desc.name || key,
        value
      };
    });
}

const TreeView = ({ agents }) => (
  <List component="nav">
    {agents.map(agent => (<AgentItem key={agent.agentId} agent={agent} />))}
  </List>
);

TreeView.propTypes = {
  agents : PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return (state) => ({
    agents : getAgents(state)
  });
};

const mapDispatchToProps = (dispatch) => ({
  // TODO: calls
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeView);
