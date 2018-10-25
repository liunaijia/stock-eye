
import React from 'react';
import { arrayOf, object } from 'prop-types';
import { Card, Row, Col } from 'antd';
import { STOCK_GROUPS } from '../../settings';
import withQuotes from '../withQuotes';
import Quotes from './Quotes';

const QuotesContainer = withQuotes(Quotes);

const Hq = ({ holdings }) => (
  <Card title="行情">
    <Row gutter={16}>
      {Object.entries(STOCK_GROUPS).map(([groupName, { stocks, lookBackDays }]) => (
        <Col key={groupName}>
          <QuotesContainer stockCodes={stocks} lookBackDays={lookBackDays} holdings={holdings} groupName={groupName} />
        </Col>))}
    </Row>
  </Card>
);

Hq.propTypes = {
  holdings: arrayOf(object),
};

Hq.defaultProps = {
  holdings: [],
};

export default Hq;
