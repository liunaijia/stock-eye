import React, { useState, useEffect, useContext } from 'react';
import Quotes from './Quotes';
import { StoreContext } from '../contexts';
import { allQuotesSelector } from '../services/selectors';

const Hq = () => {
  const [stockCodeInWatch, setStockCodeInWatch] = useState();
  const store = useContext(StoreContext);
  // console.log('groups', groups);

  useEffect(() => {
    if (stockCodeInWatch) {
      const allQuotes = allQuotesSelector(store);
      const stockInWatch = allQuotes.find(({ stockCode }) => stockCode === stockCodeInWatch);
      if (stockInWatch) {
        const gap = Math.max(stockInWatch.buyGap.value, stockInWatch.sellGap.value);
        document.title = `${stockInWatch.name.substr(0, 1)} ${stockInWatch.current.toFixed(2)} (${stockInWatch.currentRatio.toFixed(2)}%) ${gap}`;
      }
    }
  });

  const handleWatch = (event) => {
    setStockCodeInWatch(event.target.value);
  };

  if (!store.quotes) {
    return null;
  }

  return store.quotes.map(({ groupName, groupQuotes }) => (
    <Quotes
      key={groupName}
      groupName={groupName}
      quotes={groupQuotes}
      onWatch={handleWatch}
      stockCodeInWatch={stockCodeInWatch}
    />
  ));
};

export default Hq;
