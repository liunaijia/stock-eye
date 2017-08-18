import React from 'react';
import { number, string, arrayOf, shape } from 'prop-types';
import { Table, TableBody, TableHead, TableRow } from 'material-ui';

import StockHeld from './StockHeld';
import NarrowTableCell from './NarrowTableCell';
import NumericTableCell from './NumericTableCell';

const propTypes = {
  stocks: arrayOf(shape({
    stockCode: string.isRequired,
    stockName: string.isRequired,
    stockAmount: number.isRequired,
    sellableAmount: number.isRequired,
    floating: number.isRequired,
    floatingRate: string.isRequired,
  })),
};

const defaultProps = {
  stocks: [],
};

const Holdings = ({ stocks }) => (
  <Table>
    <TableHead>
      <TableRow>
        <NarrowTableCell>股票</NarrowTableCell>
        <NumericTableCell>持有量</NumericTableCell>
        <NumericTableCell>可卖量</NumericTableCell>
        <NumericTableCell>浮动盈亏</NumericTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {stocks.map(stock => (
        <StockHeld
          key={stock.stockCode}
          stockName={stock.stockName}
          stockAmount={stock.stockAmount}
          sellableAmount={stock.sellableAmount}
          floating={stock.floating}
          floatingRate={stock.floatingRate}
        />))}
    </TableBody>
  </Table>
);

Holdings.propTypes = propTypes;
Holdings.defaultProps = defaultProps;

export default Holdings;
