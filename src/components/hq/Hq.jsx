
import React, { useState } from 'react';
import { instanceOf } from 'prop-types';
import { Card } from 'antd';
import Quotes from './Quotes';

const Hq = ({ quotes }) => {
  const [stockCodeInWatch, setStockCodeInWatch] = useState();

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
