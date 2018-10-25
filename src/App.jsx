import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { Layout } from 'antd';
import styled from 'styled-components';

import { PLACE_ORDER } from './actions';
import { sendMessage } from './chromeApi';
import withPortfolio from './withPortfolio';
import withTradeSuggesion from './withTradeSuggesion';
import withNotification from './withNotification';

import Portfolio from './components/Portfolio';
import GroupTradeSuggestions from './components/GroupTradeSuggestions';
import ProgressBar from './components/ProgressBar';
import ErrorBoundary from './components/ErrorBoundary';
import { Hq, LiteHq } from './components/hq';
import { sendNotification } from './notification';
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

  componentDidMount() {
    sendNotification({ title: 'started' });
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
    const { portfolio, tradeSuggestion, className } = this.props;
    const { operationResults } = this.state;
    return (
      <ErrorBoundary>
        <Layout className={className}>
          <Content>
            <Hq {...portfolio} />
            <Portfolio {...portfolio} />
            <ProgressBar visible={tradeSuggestion.loading} />
            <section>
              <p>
                {operationResults}
              </p>
            </section>
            {tradeSuggestion.groups.map(group => (
              <GroupTradeSuggestions
                key={group.groupName}
                {...group}
                onPlaceOrder={this.handlePlaceOrder}
              />
            ))}
          </Content>
          <Sider className="sider" width="auto">
            <LiteHq />
          </Sider>
        </Layout>
      </ErrorBoundary>
    );
  }
}

export default styled(withPortfolio()(withTradeSuggesion()(withNotification()(App))))`
  .sider {
    background: #1e1e1d;
  }
`;
