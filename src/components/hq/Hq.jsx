
import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'antd';
import Quotes from './Quotes';
import { StoreContext } from '../../contexts';
import { allQuotesSelector } from '../../models/selectors';

const Hq = () => {
  const [stockCodeInWatch, setStockCodeInWatch] = useState();
  const store = useContext(StoreContext);
  // console.log('groups', groups);

  useEffect(() => {
    if (stockCodeInWatch) {
      const allQuotes = allQuotesSelector(store);
      const stockInWatch = allQuotes.find(({ stockCode }) => stockCode === stockCodeInWatch);
      if (stockInWatch) {
        document.title = `${stockInWatch.name.substr(0, 1)} ${stockInWatch.current} (${stockInWatch.currentRatio.toFixed(2)}%)`;
      }
    }
  });

  const handleWatch = (event) => {
    setStockCodeInWatch(event.target.value);
  };

  return (
    <>
      {store.quotes && store.quotes.map(({ groupName, groupQuotes }) => (
        <Card key={groupName} bordered={false}>
          <Quotes
            quotes={groupQuotes}
            groupName={groupName}
            onWatch={handleWatch}
            stockCodeInWatch={stockCodeInWatch}
          />
        </Card>
      ))}
    </>
  );
};

export default Hq;
