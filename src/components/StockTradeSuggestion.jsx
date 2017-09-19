import React, { Component } from 'react';
import { string, number, func, oneOf } from 'prop-types';
import styled from 'styled-components';

import Quotes from './Quotes';
import TradeFrom from './TradeForm';

class StockTradeSuggestion extends Component {
  static propTypes = {
    className: string,
    tradeType: oneOf(['buy', 'sell']).isRequired,
    stockCode: string,
    stockName: string,
    price: number,
    maxAmount: number,
    onPlaceOrder: func.isRequired,
  };

  static defaultProps = {
    className: null,
    stockCode: null,
    stockName: null,
    price: 0,
    maxAmount: 0,
  };

  handleSubmit = (formData) => {
    this.props.onPlaceOrder({ ...formData, tradeType: this.props.tradeType });
  };

  render() {
    const { className, tradeType, stockCode, stockName, price, maxAmount } = this.props;
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
          <Quotes stockCode={stockCode} />
        </section>
      </article>
    );
  }
}

export default styled(StockTradeSuggestion) `
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
