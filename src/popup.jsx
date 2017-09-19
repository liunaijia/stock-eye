import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Portfolio from './components/Portfolio';
import GroupTradeSuggestions from './components/GroupTradeSuggestions';
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
      groups: [
        {
          name: '',
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
        },
      ],
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
        groups: Object.entries(tradeSuggestion).map(([groupName, suggestion]) => {
          const toBuy = suggestion.buying ? {
            gap: suggestion.buying.value,
            timestamp: suggestion.buying.timestamp,
            stockCode: suggestion.buying.toBuy.stockCode,
            stockName: suggestion.buying.toBuy.stockName,
            price: suggestion.buying.toBuy.price,
            maxAmount: suggestion.buying.toBuy.maxAmount,
          } : null;
          const toSell = suggestion.selling ? {
            gap: suggestion.selling.value,
            timestamp: suggestion.selling.timestamp,
            stockCode: suggestion.selling.toSell.stockCode,
            stockName: suggestion.selling.toSell.stockName,
            price: suggestion.selling.toSell.price,
            maxAmount: suggestion.selling.toSell.maxAmount,
          } : null;
          return { name: groupName, toBuy, toSell };
        }),

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
          <ProgressBar visible={this.state.tradeSuggestion.isLoading} />
          {this.state.tradeSuggestion.isInitialized &&
          <div>
            <section>
              <p>{this.state.operationResults}</p>
            </section>
            {this.state.tradeSuggestion.groups.map(group => (
              <GroupTradeSuggestions key={group.name} name={group.name} toBuy={group.toBuy} toSell={group.toSell} onPlaceOrder={this.handlePlaceOrder} />
            ))}
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

