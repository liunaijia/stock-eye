
import React from 'react';
import { Card, Row, Col } from 'antd';
import WithQuotes from './WithQuotes';
import Quotes from './Quotes';

const Hq = ({ groups }) => (
  <Card title="行情">
    <Row gutter={16}>
      {Object.entries(groups).map(([groupName, { stocks, lookBackDays }]) => (
        <Col key={groupName}>
          <WithQuotes stockCodes={stocks} lookBackDays={lookBackDays}>
            {quotes => <Quotes quotes={quotes} groupName={groupName} /> }
          </WithQuotes>
        </Col>))}
    </Row>
  </Card>
);

Hq.propTypes = {
  groups: Object,
};

Hq.defaultProps = {
  groups: {},
};

export default Hq;
