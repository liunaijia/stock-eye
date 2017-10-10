import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import Holding from './Holding';

const propTypes = {
  className: string,
  holdings: arrayOf(shape({
    stockCode: string,
    stockName: string,
    stockAmount: number,
    sellableAmount: number,
    floating: number,
    floatingRate: string,
  })),
};

const defaultProps = {
  className: null,
  holdings: [],
};

const Holdings = ({ className, holdings }) => (
  <table className={className}>
    <thead>
      <tr>
        <th>股票</th>
        <th>持有量</th>
        <th>可卖量</th>
        <th>浮动盈亏</th>
      </tr>
    </thead>
    <tbody>
      {(holdings || [])
        .map(stock => (
          <Holding
            key={stock.stockCode}
            stockName={stock.stockName}
            stockAmount={stock.stockAmount}
            sellableAmount={stock.sellableAmount}
            floating={stock.floating}
            floatingRate={stock.floatingRate}
          />
        ))}
    </tbody>
  </table>
);

Holdings.propTypes = propTypes;
Holdings.defaultProps = defaultProps;

export default styled(Holdings)`
  width: 100%;

  tr {
    line-height: 1.3rem;
  }

  th,
  td {
    &:nth-child(1) {
      text-align: center;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      text-align: right;
    }
  }
`;
