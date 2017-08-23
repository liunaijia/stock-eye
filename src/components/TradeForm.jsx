import React, { Component } from 'react';
import { string, number, func, oneOf } from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: string,
  tradeType: oneOf(['buy', 'sell']),
  price: number,
  maxAmount: number,
  onSubmit: func,
};

const defaultProps = {
  className: null,
  tradeType: 'buy',
  price: null,
  maxAmount: null,
  onSubmit: null,
};

// It should be a stateful component
const TradeForm = ({ className, tradeType, price, maxAmount, onSubmit }) => (
  <form className={className} onSubmit={onSubmit}>
    价格：<input value={price} type="number" />
    数量：<input value={maxAmount} required type="number" />
    可{tradeType === 'buy' ? '买' : '卖'}：{maxAmount}
    <input type="submit" value={tradeType === 'buy' ? '买入' : '卖出'} />
  </form>
);

TradeForm.propTypes = propTypes;
TradeForm.defaultProps = defaultProps;

export default styled(TradeForm)`
  input {
    color: var(${({ tradeType }) => (tradeType === 'buy' ? '--red' : '--green')});
  }
`;
