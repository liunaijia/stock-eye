import React from 'react';
import { node } from 'prop-types';
import useSettings from './services/useSettings';
import useQuotes from './services/useQuotes';

const StoreContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const groups = useSettings();
  const quotes = useQuotes(groups);
  // console.log('quotes', quotes);

  return (
    <StoreContext.Provider value={{ groups, quotes }}>
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
