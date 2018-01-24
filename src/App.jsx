import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shape, string } from 'prop-types';
import { Layout } from 'antd';
import styled from 'styled-components';

import Portfolio from './components/Portfolio';
import GroupTradeSuggestions from './components/GroupTradeSuggestions';
import ProgressBar from './components/ProgressBar';
import ErrorBoundary from './components/ErrorBoundary';
import { PLACE_ORDER } from './actions';
import { sendMessage } from './chromeApi';
import withPortfolio from './withPortfolio';
import withTradeSuggesion from './withTradeSuggesion';
import { Hq, LiteHq } from './components/hq';
import './App.css';

const { Content, Sider } = Layout;

class App extends Component {
  static propTypes = {
    portfolio: shape(),
    tradeSuggestion: shape(),
    className: string,
  };

  static defaultProps = {
    portfolio: null,
    tradeSuggestion: null,
    className: null,
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
    const { portfolio, tradeSuggestion, className } = this.props;
    return (
      <ErrorBoundary>
        <Layout className={className}>
          <Content>
            <Hq />
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
          <Sider className="sider" width="1%">
            <LiteHq />
          </Sider>
        </Layout>
      </ErrorBoundary>
    );
  }
}


const Wrapper = withPortfolio(withTradeSuggesion(styled(App)`
  .sider {
    background: #1e1e1d;
  }
`));

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Wrapper />, document.getElementById('root'));
});
