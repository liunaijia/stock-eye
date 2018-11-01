import React, { Component } from 'react';
import { string } from 'prop-types';
import { Layout } from 'antd';
import styled from 'styled-components';
import TradeSuggestion from './components/TradeSuggestion';
import TradeNotification from './components/TradeNotification';

import ErrorBoundary from './components/ErrorBoundary';
import { Hq, LiteHq } from './components/hq';
import GlobalStyle from './App.css';
import SettingLoader from './SettingLoader';
import QuotesFetcher from './components/QuotesFetcher';

const { Content, Sider } = Layout;

class App extends Component {
  static propTypes = {
    className: string,
  };

  static defaultProps = {
    className: null,
  }

  componentDidMount() {
  }

  render() {
    const { className } = this.props;
    return (
      <ErrorBoundary>
        <GlobalStyle />
        <SettingLoader />
        <QuotesFetcher />
        <Layout className={className}>
          <Content>
            <Hq />
          </Content>
          <Sider className="sider" width="auto">
            <LiteHq />
          </Sider>
          <TradeSuggestion>
            {suggestions => <TradeNotification suggestions={suggestions} />}
          </TradeSuggestion>
        </Layout>
      </ErrorBoundary>
    );
  }
}

export default styled(App)`
  .sider {
    background: #1e1e1d;
  }
`;
