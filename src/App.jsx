import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shape } from 'prop-types';

import Portfolio from './components/Portfolio';
import GroupTradeSuggestions from './components/GroupTradeSuggestions';
import ProgressBar from './components/ProgressBar';
import ErrorBoundary from './components/ErrorBoundary';
import { GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import { sendMessage } from './chromeApi';
import withPortfolio from './withPortfolio';
import './App.css';

class App extends Component {
  static propTypes = {
    portfolio: shape(),
  };

  static defaultProps = {
    portfolio: null,
  }

  state = {
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
    // this.initTradeSuggestion();
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
            compareWith: suggestion.buying.compareWith,
          } : null;
          const toSell = suggestion.selling ? {
            gap: suggestion.selling.value,
            timestamp: suggestion.selling.timestamp,
            stockCode: suggestion.selling.toSell.stockCode,
            stockName: suggestion.selling.toSell.stockName,
            price: suggestion.selling.toSell.price,
            maxAmount: suggestion.selling.toSell.maxAmount,
            compareWith: suggestion.selling.compareWith,
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
    const { portfolio } = this.props;
    return (
      <ErrorBoundary>
        <Portfolio {...portfolio} />
        <article>
          <ProgressBar visible={this.state.tradeSuggestion.isLoading} />
          {this.state.tradeSuggestion.isInitialized &&
            <div>
              <section>
                <p>{this.state.operationResults}</p>
              </section>
              {this.state.tradeSuggestion.groups.map(group => (
                <GroupTradeSuggestions
                  key={group.name}
                  name={group.name}
                  toBuy={group.toBuy}
                  toSell={group.toSell}
                  onPlaceOrder={this.handlePlaceOrder}
                />
              ))}
            </div>
          }
        </article>
      </ErrorBoundary>
    );
  }
}

const Wrapper = withPortfolio(App);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Wrapper />, document.getElementById('root'));
});
