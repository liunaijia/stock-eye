import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Portfolio from './components/Portfolio';
import TradeSuggestion from './components/TradeSuggestion';
import ProgressBar from './components/ProgressBar';
import { GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import { sendMessage } from './chromeApi';
import { getPortfolio } from './newoneApi';
import { isTradeTime, sleep } from './time';
import './popup.css';

class Popup extends Component {
  state = {
    portfolio: {
      availableCash: null,
      holdings: [],
      isInitialized: false,
      isLoading: false,
    },
    tradeSuggestion: {
      toBuy: {
        gap: null,
        stockCode: null,
        stockName: null,
        price: null,
        maxAmount: null,
        timestamp: null,
      },
      toSell: {
        gap: null,
        stockCode: null,
        stockName: null,
        price: null,
        maxAmount: null,
        timestamp: null,
      },
      isInitialized: false,
      isLoading: false,
    },
  };

  async componentDidMount() {
    this.initPortfolio();
    this.initTradeSuggestion();
  }

  async initPortfolio(interval = 10) {
    if (isTradeTime() || !this.state.portfolio.isInitialized) {
      this.setState({ portfolio: { ...this.state.portfolio, isLoading: true } });
      const portfolio = await getPortfolio();
      this.setState({
        portfolio: {
          availableCash: portfolio.availableCash,
          holdings: portfolio.holdings,
          isInitialized: true,
          isLoading: false,
        },
      });
    }

    await sleep(interval);
    this.initPortfolio(interval);
  }

  async initTradeSuggestion() {
    this.setState({ tradeSuggestion: { ...this.state.tradeSuggestion, isLoading: true } });
    const tradeSuggestion = await sendMessage({ type: GET_TRADE_SUGGESTION });

    this.setState({
      tradeSuggestion: {
        toBuy: {
          gap: tradeSuggestion.currentGapToBuy.value,
          timestamp: tradeSuggestion.currentGapToBuy.timestamp,
          stockCode: tradeSuggestion.currentGapToBuy.toBuy.stockCode,
          stockName: tradeSuggestion.currentGapToBuy.toBuy.stockName,
          price: tradeSuggestion.currentGapToBuy.toBuy.price,
          maxAmount: tradeSuggestion.currentGapToBuy.toBuy.maxAmount,
        },
        toSell: {
          gap: tradeSuggestion.currentGapToSell.value,
          timestamp: tradeSuggestion.currentGapToSell.timestamp,
          stockCode: tradeSuggestion.currentGapToSell.toSell.stockCode,
          stockName: tradeSuggestion.currentGapToSell.toSell.stockName,
          price: tradeSuggestion.currentGapToSell.toSell.price,
          maxAmount: tradeSuggestion.currentGapToSell.toSell.maxAmount,
        },
        isInitialized: true,
        isLoading: false,
      },
    });
  }

  handlePlaceOrder = async (order) => {
    const payload = {
      type: order.tradeType,
      stockCode: order.stockCode,
      price: order.price,
      amount: order.amount,
    };
    const response = await sendMessage({ type: PLACE_ORDER, payload });
    this.setState({ operationResults: response });
  }

  render() {
    return (
      <div>
        <Portfolio
          availableCash={this.state.portfolio.availableCash}
          holdings={this.state.portfolio.holdings}
          isLoading={this.state.portfolio.isLoading}
        />
        <article>
          <header>交易建议</header>
          <ProgressBar visible={this.state.tradeSuggestion.isLoading} />
          {this.state.tradeSuggestion.isInitialized &&
          <div>
            <section>
              <p>{this.state.operationResults}</p>
            </section>
            <section>
              买入 {this.state.tradeSuggestion.toBuy.stockName}
              GAP：[{this.state.tradeSuggestion.toBuy.gap}]
              <time>{new Date(this.state.tradeSuggestion.toBuy.timestamp).toLocaleTimeString()}</time>
              <TradeSuggestion
                tradeType="buy"
                stockCode={this.state.tradeSuggestion.toBuy.stockCode}
                stockName={this.state.tradeSuggestion.toBuy.stockName}
                price={this.state.tradeSuggestion.toBuy.price}
                maxAmount={this.state.tradeSuggestion.toBuy.maxAmount}
                onPlaceOrder={this.handlePlaceOrder}
              />
            </section>
            <section>
              卖出 {this.state.tradeSuggestion.toSell.stockName}
              GAP：[{this.state.tradeSuggestion.toSell.gap}]
              <time>{new Date(this.state.tradeSuggestion.toSell.timestamp).toLocaleTimeString()}</time>
              <TradeSuggestion
                tradeType="sell"
                stockCode={this.state.tradeSuggestion.toSell.stockCode}
                stockName={this.state.tradeSuggestion.toSell.stockName}
                price={this.state.tradeSuggestion.toSell.price}
                maxAmount={this.state.tradeSuggestion.toSell.maxAmount}
                onPlaceOrder={this.handlePlaceOrder}
              />
            </section>
          </div>
          }
        </article>

      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Popup />, document.getElementById('root'));
});

