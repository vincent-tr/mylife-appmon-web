'use strict';

import React       from 'react';
import PropTypes   from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Value</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {value.map((value, index) => (
        <TableRow key={index}>
          <TableCell><Value value={value} /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

ArrayValue.propTypes = {
  value : PropTypes.array.isRequired
};

const ObjectValue = ({ value }) => (
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
          <TableCell><Value value={value} /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

ObjectValue.propTypes = {
  value : PropTypes.object.isRequired
};

const TableValue = ({ value }) => {
  const keys = Array.from(value.reduce((set, row) => {
    Object.keys(row).forEach(key => set.add(key));
    return set;
  }, new Set()));

  return (
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
                <Value value={row[key]} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

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
