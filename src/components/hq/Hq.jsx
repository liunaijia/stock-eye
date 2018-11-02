
import React from 'react';
import { instanceOf } from 'prop-types';
import { Card, Row, Col } from 'antd';
import Quotes from './Quotes';

const Hq = ({ quotes }) => (
  <Card title="行情">
    <Row gutter={16}>
      {Object.entries(quotes).map(([groupName, quotesInGroup]) => (
        <Col key={groupName}>
          <Quotes quotes={quotesInGroup} groupName={groupName} />
        </Col>))}
    </Row>
  </Card>
);

Hq.propTypes = {
  quotes: instanceOf(Object),
};

Hq.defaultProps = {
  quotes: {},
};

export default Hq;
