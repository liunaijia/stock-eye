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
      gap: null,
      toBuy: {},
      toSell: {},
      timestamp: null,
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

      if (this.state.tradeSuggestion.isInitialized) {
        const holding = this.state.portfolio.holdings.find(h =>
          h.stockCode === this.state.tradeSuggestion.toSell.stockCode);
        this.setState({
          tradeSuggestion: {
            ...this.state.tradeSuggestion,
            toBuy: {
              ...this.state.tradeSuggestion.toBuy,
              maxAmount: this.cutoffAmount(this.state.tradeSuggestion.toBuy.price,
                this.state.portfolio.availableCash),
            },
            toSell: {
              ...this.state.tradeSuggestion.toSell,
              maxAmount: holding ? holding.sellableAmount : 0,
            },
          },
        });
      }
    }

    await sleep(interval);
    this.initPortfolio(interval);
  }

  async initTradeSuggestion() {
    this.setState({ tradeSuggestion: { ...this.state.tradeSuggestion, isLoading: true } });
    const tradeSuggestion = await sendMessage({ type: GET_TRADE_SUGGESTION });
    this.setState({
      tradeSuggestion: {
        gap: tradeSuggestion.value,
        toBuy: tradeSuggestion.toBuy,
        toSell: tradeSuggestion.toSell,
        timestamp: tradeSuggestion.timestamp,
        isInitialized: true,
        isLoading: false,
      },
    });
  }

  cutoffAmount = (price = 0, balance = 0, commission = 5) => {
    const amount = Math.floor(balance / price / 100) * 100;
    if (amount <= 0) {
      return 0;
    }

    const cost = amount * price * (1 + (commission / 10000));
    if (balance < cost) {
      return amount - 100;
    }
    return amount;
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
              GAP：[{this.state.tradeSuggestion.gap}]
              <time>{new Date(this.state.tradeSuggestion.timestamp).toLocaleTimeString()}</time>
            </section>
            <section>
              <p>{this.state.operationResults}</p>
            </section>
            <section>
              买入 {this.state.tradeSuggestion.toBuy.stockName}
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

