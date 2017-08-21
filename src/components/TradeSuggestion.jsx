import React from 'react';
import { string, number, shape, array } from 'prop-types';

import Quotes from './Quotes';

const propTypes = {
  stockCode: string,
  stockName: string,
  price: number,
  maxAmount: number,
  quotes: shape({
    current: number,
    buyingBids: array,
    sellingBids: array,
  }),
};

const defaultProps = {
  stockCode: '',
  stockName: '',
  price: 0,
  maxAmount: 0,
  quotes: {},
};

const TradeSuggestion = ({ stockCode, stockName, price, maxAmount, quotes }) => (
  <div>
    {stockName} {stockCode}
    价格{price}
    数量{maxAmount}
    <Quotes
      currentPrice={quotes.current}
      buyingBids={quotes.buyingBids}
      sellingBids={quotes.sellingBids}
    />
  </div>
);

TradeSuggestion.propTypes = propTypes;
TradeSuggestion.defaultProps = defaultProps;

export default TradeSuggestion;
