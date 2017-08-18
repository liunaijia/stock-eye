import React from 'react';
import { string, number } from 'prop-types';
import { TableRow } from 'material-ui';


import Number from './Number';
import NarrowTableCell from './NarrowTableCell';
import NumericTableCell from './NumericTableCell';

const propTypes = {
  stockName: string.isRequired,
  stockAmount: number.isRequired,
  sellableAmount: number.isRequired,
  floating: number.isRequired,
  floatingRate: string.isRequired,
};

function StockHeld({ stockName, stockAmount, sellableAmount, floating, floatingRate }) {
  return (
    <TableRow hover>
      <NarrowTableCell>{stockName}</NarrowTableCell>
      <NumericTableCell>{stockAmount}</NumericTableCell>
      <NumericTableCell>{sellableAmount}</NumericTableCell>
      <NumericTableCell><Number>{floating} ({floatingRate})</Number></NumericTableCell>
    </TableRow>
  );
}

StockHeld.propTypes = propTypes;

export default StockHeld;
