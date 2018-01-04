import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shape } from 'prop-types';
import { Layout } from 'antd';

import Portfolio from './components/Portfolio';
import GroupTradeSuggestions from './components/GroupTradeSuggestions';
import ProgressBar from './components/ProgressBar';
import ErrorBoundary from './components/ErrorBoundary';
import { PLACE_ORDER } from './actions';
import { sendMessage } from './chromeApi';
import withPortfolio from './withPortfolio';
import withTradeSuggesion from './withTradeSuggesion';
import './App.css';

const { Content } = Layout;

class App extends Component {
  static propTypes = {
    portfolio: shape(),
    tradeSuggestion: shape(),
  };

  static defaultProps = {
    portfolio: null,
    tradeSuggestion: null,
  }

  state = {
  };

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
    const { portfolio, tradeSuggestion } = this.props;
    return (
      <ErrorBoundary>
        <Layout>
          <Content>
            <Portfolio {...portfolio} />
            <ProgressBar visible={tradeSuggestion.loading} />
            <section>
              <p>{this.state.operationResults}</p>
            </section>
            {tradeSuggestion.groups.map(group => (
              <GroupTradeSuggestions
                key={group.groupName}
                {...group}
                onPlaceOrder={this.handlePlaceOrder}
              />
              ))}
          </Content>
        </Layout>

      </ErrorBoundary>
    );
  }
}

const Wrapper = withPortfolio(withTradeSuggesion(App));

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Wrapper />, document.getElementById('root'));
});
