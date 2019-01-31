
import React, { useContext } from 'react';
import LiteQuotes from './LiteQuotes';
import { StoreContext } from '../contexts';
import { allQuotesSelector } from '../services/selectors';

const LiteHq = () => {
  const store = useContext(StoreContext);
  const allQuotes = allQuotesSelector(store);
  return (
    <LiteQuotes quotes={allQuotes} />
  );
};

export default LiteHq;
