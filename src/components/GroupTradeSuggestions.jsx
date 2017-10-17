import React, { Component } from 'react';
import { string, number, shape, func } from 'prop-types';

import StockTradeSuggestion from './StockTradeSuggestion';

class GroupTradeSuggestions extends Component {
  static propTypes = {
    className: string,
    name: string,
    toBuy: shape({
      stockCode: string,
      stockName: string,
      price: number,
      maxAmount: number,
      timestamp: number,
      gap: number,
      compareWith: shape(),
    }),
    toSell: shape({
      stockCode: string,
      stockName: string,
      price: number,
      maxAmount: number,
      timestamp: number,
      gap: number,
      compareWith: shape(),
    }),
    onPlaceOrder: func.isRequired,
  };

  static defaultProps = {
    className: null,
    name: null,
    toBuy: null,
    toSell: null,
  };

  render() {
    const {
      className, name, toBuy, toSell, onPlaceOrder,
    } = this.props;
    return (
      <article className={className}>
        <header>{name}</header>
        {toBuy &&
        <section>
          <div>
              买入 {toBuy.stockName}
              GAP：[{toBuy.gap}]
              相比：{`${toBuy.compareWith.stockName} ${toBuy.compareWith.price}`}
          </div>
          <time>{new Date(toBuy.timestamp).toLocaleTimeString()}</time>
          <StockTradeSuggestion
            tradeType="buy"
            stockCode={toBuy.stockCode}
            stockName={toBuy.stockName}
            price={toBuy.price}
            maxAmount={toBuy.maxAmount}
            onPlaceOrder={onPlaceOrder}
          />
        </section>
        }
        {toSell &&
        <section>
          <div>
              卖出 {toSell.stockName}
              GAP：[{toSell.gap}]
              相比：{`${toSell.compareWith.stockName} ${toSell.compareWith.price}`}
          </div>
          <time>{new Date(toSell.timestamp).toLocaleTimeString()}</time>
          <StockTradeSuggestion
            tradeType="sell"
            stockCode={toSell.stockCode}
            stockName={toSell.stockName}
            price={toSell.price}
            maxAmount={toSell.maxAmount}
            onPlaceOrder={onPlaceOrder}
          />
        </section>
        }
      </article>
    );
  }
}

export default GroupTradeSuggestions;