import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Portfolio from './components/Portfolio';
import TradeSuggestion from './components/TradeSuggestion';
import ProgressBar from './components/ProgressBar';
import { GET_PORTFOLIO, GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import { sendMessage } from './chromeApi';
import { sleep } from './time';
import './popup.css';

class Popup extends Component {
  state = {
    portfolio: {
      availableCash: null,
      holdings: [],
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
    this.setState({ portfolio: { ...this.state.portfolio, isLoading: true } });

    const portfolio = await sendMessage({ type: GET_PORTFOLIO });
    this.setState({
      portfolio: {
        availableCash: portfolio.availableCash,
        holdings: portfolio.holdings,
        isLoading: false,
      },
    });

    await sleep(interval);
    this.initPortfolio(interval);
  }

  async initTradeSuggestion() {
    this.setState({ tradeSuggestion: { ...this.state.tradeSuggestion, isLoading: true } });
    const tradeSuggestion = await sendMessage({ type: GET_TRADE_SUGGESTION });

    this.setState({
      tradeSuggestion: {
        toBuy: {
          gap: tradeSuggestion.buying.value,
          timestamp: tradeSuggestion.buying.timestamp,
          stockCode: tradeSuggestion.buying.toBuy.stockCode,
          stockName: tradeSuggestion.buying.toBuy.stockName,
          price: tradeSuggestion.buying.toBuy.price,
          maxAmount: tradeSuggestion.buying.toBuy.maxAmount,
        },
        toSell: {
          gap: tradeSuggestion.selling.value,
          timestamp: tradeSuggestion.selling.timestamp,
          stockCode: tradeSuggestion.selling.toSell.stockCode,
          stockName: tradeSuggestion.selling.toSell.stockName,
          price: tradeSuggestion.selling.toSell.price,
          maxAmount: tradeSuggestion.selling.toSell.maxAmount,
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

