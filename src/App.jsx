import React from 'react';
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
import useSettings from './useSettings';
import useQuotes from './useQuotes';
import { StoreContext } from './contexts';

const { Content, Sider } = Layout;

const App = ({ className }) => {
  const groups = useSettings();
  const quotes = useQuotes(groups);
  // console.log('quotes', quotes);
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <StoreContext.Provider value={{ groups, quotes }}>
          <GlobalStyle />
          <Layout className={className}>
            <Content>
              <Hq />
            </Content>
            <Sider className="sider" width="auto">
              <LiteHq />
            </Sider>
            <TradeSuggestion />
          </Layout>
        </StoreContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};

App.propTypes = {
  className: string,
};

App.defaultProps = {
  className: null,
};

export default hot(module)(styled(App)`
  .sider {
    background: #1e1e1d;
  }
`);
