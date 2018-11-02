
import React from 'react';
import { instanceOf } from 'prop-types';
import { Card } from 'antd';
import Quotes from './Quotes';

const Hq = ({ quotes }) => (
  <>
    {Object.entries(quotes).map(([groupName, quotesInGroup]) => (
      <Card key={groupName} bordered={false}>
        <Quotes quotes={quotesInGroup} groupName={groupName} />
      </Card>
    ))}
  </>
);

Hq.propTypes = {
  quotes: instanceOf(Object),
};

Hq.defaultProps = {
  quotes: {},
};

export default Hq;
