'use strict';

import React       from 'react';
import PropTypes   from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button     from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess     from '@material-ui/icons/ExpandLess';
import ExpandMore     from '@material-ui/icons/ExpandMore';

class ExtensibleValue extends React.Component {
  state = {
    isSubValue: false,
    open: false
  };

  static getDerivedStateFromProps(props, state) {
    if(props.isSubValue !== state.isSubValue) {
      return {
        isSubValue : props.isSubValue,
        open : props.isSubValue
      };
    }

    return null;
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { open } = this.state;
    const { children, summary } = this.props;

    return (
      <React.Fragment>
        <Button onClick={this.handleClick}>
          {open && <ExpandLess />}
          {!open && <ExpandMore />}
        </Button>

        <Collapse in={!open} timeout="auto" unmountOnExit>
          {summary}
        </Collapse>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </React.Fragment>
    );
  }

  static propTypes = {
    children : PropTypes.node,
    summary  : PropTypes.node
  }
}

const NullValue = () => (
  <Typography>{'(null)'}</Typography>
);

const StringValue = ({ value }) => (
  <Typography>{value}</Typography>
);

StringValue.propTypes = {
  value : PropTypes.string.isRequired
};

const NumberValue = ({ value }) => (
  <Typography>{value.toLocaleString()}</Typography>
);

NumberValue.propTypes = {
  value : PropTypes.number.isRequired
};

const BoolValue = ({ value }) => (
  <Typography>{value ? 'true' : 'false'}</Typography>
);

BoolValue.propTypes = {
  value : PropTypes.bool.isRequired
};

const ArrayValue = ({ value, isSubValue }) => (
  <ExtensibleValue isSubValue={isSubValue} summary={
    <Typography>{JSON.stringify(value)}</Typography>
  }>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {value.map((value, index) => (
          <TableRow key={index}>
            <TableCell><Value isSubValue={true} value={value} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </ExtensibleValue>
);

ArrayValue.propTypes = {
  value : PropTypes.array.isRequired,
  isSubValue : PropTypes.bool
};

const ObjectValue = ({ value, isSubValue }) => (
  <ExtensibleValue isSubValue={isSubValue} summary={
    <Typography>{JSON.stringify(value)}</Typography>
  }>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(value).map(([ key, value ]) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell><Value isSubValue={true} value={value} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </ExtensibleValue>
);

ObjectValue.propTypes = {
  value : PropTypes.object.isRequired,
  isSubValue : PropTypes.bool
};

const TableValue = ({ value, isSubValue }) => {
  const keys = Array.from(value.reduce((set, row) => {
    Object.keys(row).forEach(key => set.add(key));
    return set;
  }, new Set()));

  return (
    <ExtensibleValue isSubValue={isSubValue} summary={
      <Typography>{JSON.stringify(value)}</Typography>
    }>
      <Table>
        <TableHead>
          <TableRow>
            {keys.map(key => (<TableCell key={key}>{key}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {value.map((row, index) => (
            <TableRow key={index}>
              {keys.map(key => (
                <TableCell key={key}>
                  <Value isSubValue={true} value={row[key]} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ExtensibleValue>
  );
};

TableValue.propTypes = {
  value : PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  isSubValue : PropTypes.bool
};

const components = {
  null    : NullValue,
  string  : StringValue,
  number  : NumberValue,
  boolean : BoolValue,
  array   : ArrayValue,
  object  : ObjectValue,
  table   : TableValue
};

const Value = ({ value, isSubValue = false }) => {
  const type = typeOf(value);
  const Component = components[type];
  return (<Component value={value} isSubValue={isSubValue} />);
};

Value.propTypes = {
  value : PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  isSubValue : PropTypes.bool
};

export default Value;

function typeOf(value) {
  if(value == null) {
    return 'null';
  }
  if(Array.isArray(value)) {
    if(typeOf(value[0]) === 'object') {
      return 'table';
    }
    return 'array';
  }
  return typeof value;
}
