import React from 'react';
import { string } from 'prop-types';
import { hot } from 'react-hot-loader';
import { Layout } from 'antd';
import styled from 'styled-components';
import {
  Hq, LiteHq, TradeSuggestion, ErrorBoundary,
} from './components';
import GlobalStyle from './App.css';
import useSettings from './services/useSettings';
import useQuotes from './services/useQuotes';
import { StoreContext } from './contexts';

const { Content, Sider } = Layout;

const App = ({ className }) => {
  const groups = useSettings();
  const quotes = useQuotes(groups);
  // console.log('quotes', quotes);
  return (
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
