import React from 'react';
import { string, number, shape, array, func, oneOf } from 'prop-types';
import styled from 'styled-components';

import Quotes from './Quotes';
import TradeFrom from './TradeForm';

const propTypes = {
  className: string,
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
  className: null,
  price: 0,
  maxAmount: 0,
  quotes: {},
};

const TradeSuggestion = ({ className, tradeType, price, maxAmount, quotes, onPlaceOrder }) => (
  <article className={className}>
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

export default styled(TradeSuggestion)`
  display: flex;

  section {
    &:nth-child(1) {
      flex-grow: 1;
    }

    &:nth-child(2) {
      flex-grow: 1;
    }
  }
`;
