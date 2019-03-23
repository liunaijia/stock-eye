import React, { useState } from 'react';
import { string } from 'prop-types';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import {
  Hq, LiteHq, TradeSuggestion, ErrorBoundary, AlarmControl,
} from './components';
import GlobalStyle from './App.css';
import { ContextProvider } from './contexts';

const App = ({ className }) => {
  const [alarmStatus, setAlarmStatus] = useState('on');

  const handleAlarmControlChange = (e) => {
    setAlarmStatus(e.target.value);
  };

  return (
    <ErrorBoundary>
      <ContextProvider>
        <GlobalStyle />
        <main className={className}>
          <article>
            <AlarmControl status={alarmStatus} onChange={handleAlarmControlChange} />
            <Hq />
          </article>
          <aside>
            <LiteHq />
          </aside>
          {alarmStatus === 'on' && <TradeSuggestion />}
        </main>
      </ContextProvider>
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
  display: flex;
  min-height: 100vh;

  article {
    flex: 1;
  }

  aside {
    width: auto;
    background: #1e1e1d;
  }
`);
