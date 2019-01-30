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
import SettingLoader from './SettingLoader';
import QuoteFetcher from './components/QuoteFetcher';
import useSettings from './useSettings';
import useQuotes from './useQuotes';
import { GroupsContext } from './contexts';

const { Content, Sider } = Layout;

const App = ({ className }) => {
  const stockGroups = useSettings();
  const quotes = useQuotes(stockGroups);

  // console.log(stockGroups, quotes);
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <GroupsContext.Provider value={quotes}>
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
        </GroupsContext.Provider>
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
