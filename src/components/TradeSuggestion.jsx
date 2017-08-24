import React from 'react';
import { number, shape, array, func, oneOf } from 'prop-types';

import Quotes from './Quotes';
import TradeFrom from './TradeForm';

const propTypes = {
  tradeType: oneOf(['buy', 'sell']).isRequired,
  price: number,
  maxAmount: number,
  quotes: shape({
    current: number,
    buyingBids: array,
    sellingBids: array,
  }),
  onPlaceOrder: func.isRequired,
};

const defaultProps = {
  price: 0,
  maxAmount: 0,
  quotes: {},
};

const TradeSuggestion = ({ tradeType, price, maxAmount, quotes, onPlaceOrder }) => (
  <article>
    <section>
      <TradeFrom
        tradeType={tradeType}
        price={price}
        maxAmount={maxAmount}
        onPlaceOrder={onPlaceOrder}
      />
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
