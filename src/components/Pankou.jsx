import React, { Component } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import Bids from './Bids';
// import { fetchStocks } from '../stockData';
import { isTradeTime, sleep } from '../time';

class Pankou extends Component {
  static propTypes = {
    className: string,
    stockCode: string.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  state = {
    currentPrice: 0,
    buyingBids: [],
    sellingBids: [],
    isInitialized: false,
  };

  async componentDidMount() {
    await this.initStock(1);
  }

  async initStock(interval) {
    if (isTradeTime() || !this.state.isInitialized) {
      const { stockCode } = this.props;
      const [stock] = await fetchStocks([stockCode]);
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
        <p>
现价
{' '}
{this.state.currentPrice}
</p>
        <Bids type="buy" bids={this.state.buyingBids} currentPrice={this.state.currentPrice} />
      </article>
    );
  }
}

export default styled(Pankou)`
  p {
    margin: 0;
  }
`;
