
import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'antd';
import Quotes from './Quotes';
import { GroupsContext } from '../../contexts';
import { allQuotesSelector } from '../../models/selectors';

const Hq = () => {
  const [stockCodeInWatch, setStockCodeInWatch] = useState();
  const groups = useContext(GroupsContext);
  console.log('groups', groups);

  useEffect(() => {
    if (stockCodeInWatch) {
      const allQuotes = allQuotesSelector(groups);
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
      {groups && groups.map(({ groupName, groupQuotes }) => (
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
