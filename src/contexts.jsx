import React from 'react';
import { node } from 'prop-types';
import useSettings from './services/useSettings';
import useQuotes from './services/useQuotes';
import useAlarm from './services/useAlarm';

const StoreContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const groups = useSettings();
  const quotes = useQuotes(groups);
  const alarm = useAlarm();
  // console.log('quotes', quotes);

  return (
    <StoreContext.Provider value={{ groups, quotes, alarm }}>
      {children}
    </StoreContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: node,
};

ContextProvider.defaultProps = {
  children: null,
};

export { StoreContext, ContextProvider };
