
import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { Card } from 'antd';
import Quotes from './Quotes';

const Hq = ({ quotes }) => {
  const [stockCodeInWatch, setStockCodeInWatch] = useState();

  useEffect(() => {
    if (stockCodeInWatch) {
      const allQuotes = Object.values(quotes).reduce((a, b) => a.concat(b), []);
      const stockInWatch = allQuotes.find(({ stockCode }) => stockCode === stockCodeInWatch);
      if (stockInWatch) {
        document.title = `${stockInWatch.name.substr(0, 1)} ${stockInWatch.currentRatio.toFixed(2)}%`;
      }
    }
  });

  const handleWatch = (event) => {
    setStockCodeInWatch(event.target.value);
  };

  return (
    <>
      {Object.entries(quotes).map(([groupName, quotesInGroup]) => (
        <Card key={groupName} bordered={false}>
          <Quotes
            quotes={quotesInGroup}
            groupName={groupName}
            onWatch={handleWatch}
            stockCodeInWatch={stockCodeInWatch}
          />
        </Card>
      ))}
    </>
  );
};

Hq.propTypes = {
  quotes: instanceOf(Object),
};

Hq.defaultProps = {
  quotes: {},
};

export default Hq;
