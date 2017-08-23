import React from 'react';
import { number, shape, array, func, oneOf } from 'prop-types';

import Quotes from './Quotes';
import TradeFrom from './TradeForm';

const propTypes = {
  tradeType: oneOf(['buy', 'sell']),
  price: number,
  maxAmount: number,
  quotes: shape({
    current: number,
    buyingBids: array,
    sellingBids: array,
  }),
  onSubmit: func,
};

const defaultProps = {
  tradeType: 'buy',
  price: 0,
  maxAmount: 0,
  quotes: {},
  onSubmit: null,
};

const TradeSuggestion = ({ tradeType, price, maxAmount, quotes, onSubmit }) => (
  <article>
    <section>
      <TradeFrom tradeType={tradeType} price={price} maxAmount={maxAmount} onSubmit={onSubmit} />
    </section>
    <section>
      <Quotes
        currentPrice={quotes.current}
        buyingBids={quotes.buyingBids}
        sellingBids={quotes.sellingBids}
      />
    </section>
  </article>
);

TradeSuggestion.propTypes = propTypes;
TradeSuggestion.defaultProps = defaultProps;

export default TradeSuggestion;
