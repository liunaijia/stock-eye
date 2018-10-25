
import React from 'react';
import { Card, Row, Col } from 'antd';
import { STOCK_GROUPS } from '../../settings';
import WithQuotes from './WithQuotes';
import Quotes from './Quotes';

const Hq = () => (
  <Card title="行情">
    <Row gutter={16}>
      {Object.entries(STOCK_GROUPS).map(([groupName, { stocks, lookBackDays }]) => (
        <Col key={groupName}>
          <WithQuotes stockCodes={stocks} lookBackDays={lookBackDays}>
            {quotes => <Quotes quotes={quotes} groupName={groupName} /> }
          </WithQuotes>
        </Col>))}
    </Row>
  </Card>
);

export default Hq;
