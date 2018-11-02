import React, { Component } from 'react';
import { string } from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Layout } from 'antd';
import styled from 'styled-components';
import store from './store';
import TradeSuggestion from './components/TradeSuggestion';

import ErrorBoundary from './components/ErrorBoundary';
import { Hq, LiteHq } from './components/hq';
import GlobalStyle from './App.css';
import SettingLoader from './SettingLoader';
import QuoteFetcher from './components/QuoteFetcher';

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
      <Provider store={store}>
        <ErrorBoundary>
          <GlobalStyle />
          <SettingLoader />
          <QuoteFetcher />
          <Layout className={className}>
            <Content>
              <Hq />
            </Content>
            <Sider className="sider" width="auto">
              <LiteHq />
            </Sider>
            <TradeSuggestion />
          </Layout>
        </ErrorBoundary>
      </Provider>
    );
  }
}

export default hot(module)(styled(App)`
  .sider {
    background: #1e1e1d;
  }
`);
