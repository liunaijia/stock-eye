
import React from 'react';
import { Card, Row, Col } from 'antd';
import { STOCK_GROUPS } from '../../settings';
import QuotesContainer from './QuotesContainer';

const Hq = () => (
  <Card title="行情">
    <Row gutter={16}>
      {Object.entries(STOCK_GROUPS).map(([groupName, { stocks }]) => (
        <Col span={12} key={groupName}>
          <Card title={groupName} type="inner">
            <QuotesContainer stockCodes={stocks} />
          </Card>
        </Col>))}
    </Row>
  </Card>
);

export default Hq;
