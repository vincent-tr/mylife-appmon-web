'use strict';

import React       from 'react';
import PropTypes   from 'prop-types';

import Typography from '@material-ui/core/Typography';

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

const ArrayValue = ({ value }) => (
  <Typography>{JSON.stringify(value)}</Typography>
);

ArrayValue.propTypes = {
  value : PropTypes.array.isRequired
};


const ObjectValue = ({ value }) => (
  <Typography>{JSON.stringify(value)}</Typography>
);

ObjectValue.propTypes = {
  value : PropTypes.object.isRequired
};


const TableValue = ({ value }) => (
  <Typography>{JSON.stringify(value)}</Typography>
);

TableValue.propTypes = {
  value : PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
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

const Value = ({ value }) => {
  const type = typeOf(value);
  const Component = components[type];
  return (<Component value={value} />);
};

Value.propTypes = {
  value : PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ])
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
