import React, { Component } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import Bids from './Bids';
import { fetchStock } from '../stockData';
import { isTradeTime, sleep } from '../time';

class Quotes extends Component {
  static propTypes = {
    className: string,
    stockCode: string.isRequired,
  };

  static defaultProps = {
    className: null,
    currentPrice: 0,
    buyingBids: [],
    sellingBids: [],
  };

  state = {
    currentPrice: 0,
    buyingBids: [],
    sellingBids: [],
    isInitialized: false,
  };

  async componentDidMount() {
    this.initStock(3);
  }

  async initStock(interval) {
    if (isTradeTime() || !this.state.isInitialized) {
      const stockCode = this.props.stockCode;
      const stock = await fetchStock(stockCode);
      this.setState({
        currentPrice: stock.current,
        buyingBids: stock.buyingBids,
        sellingBids: stock.sellingBids,
        isInitialized: true,
      });
    }

    await sleep(interval);
    this.initStock(interval);
  }

  render() {
    const { className } = this.props;
    return (
      <article className={className}>
        <Bids type="sell" bids={this.state.sellingBids} currentPrice={this.state.currentPrice} />
        <p>现价 {this.state.currentPrice}</p>
        <Bids type="buy" bids={this.state.buyingBids} currentPrice={this.state.currentPrice} />
      </article>
    );
  }
}

export default styled(Quotes)`
  p {
    margin: 0;
  }
`;
