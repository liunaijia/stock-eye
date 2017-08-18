import React from 'react';
import { number, string, arrayOf, shape } from 'prop-types';

import StockHeld from './StockHeld';

const propTypes = {
  balance: number,
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
  balance: 0,
  stocks: [],
};

const Holdings = ({ balance = 0, stocks = [] }) => (
  <div>
    <h4>可用资金：{balance || '?'}</h4>
    <table>
      <thead>
        <tr>
          <th>股票</th>
          <th>数量</th>
          <th>可卖</th>
          <th colSpan="2">浮动盈亏</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map(stock => (
          <StockHeld
            key={stock.stockCode}
            stockName={stock.stockName}
            stockAmount={stock.stockAmount}
            sellableAmount={stock.sellableAmount}
            floating={stock.floating}
            floatingRate={stock.floatingRate}
          />))}
      </tbody>
    </table>
  </div>
);

Holdings.propTypes = propTypes;
Holdings.defaultProps = defaultProps;

export default Holdings;
