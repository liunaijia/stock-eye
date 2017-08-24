import React, { Component } from 'react';
import { string, number, shape, array, func, oneOf } from 'prop-types';
import styled from 'styled-components';

import Quotes from './Quotes';
import TradeFrom from './TradeForm';

class TradeSuggestion extends Component {
  static propTypes = {
    className: string,
    tradeType: oneOf(['buy', 'sell']).isRequired,
    stockCode: string,
    stockName: string,
    price: number,
    maxAmount: number,
    quotes: shape({
      current: number,
      buyingBids: array,
      sellingBids: array,
    }),
    onPlaceOrder: func.isRequired,
  };

  static defaultProps = {
    className: null,
    stockCode: null,
    stockName: null,
    price: 0,
    maxAmount: 0,
    quotes: {},
  };

  handleSubmit = (formData) => {
    this.props.onPlaceOrder({ ...formData, tradeType: this.props.tradeType });
  };

  render() {
    const { className, tradeType, stockCode, stockName, price, maxAmount, quotes } = this.props;
    return (
      <article className={className}>
        <section>
          <TradeFrom
            tradeType={tradeType}
            stockCode={stockCode}
            stockName={stockName}
            price={price}
            maxAmount={maxAmount}
            onSubmit={this.handleSubmit}
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
  }
}

export default styled(TradeSuggestion) `
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
