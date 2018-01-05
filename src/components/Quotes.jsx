import React from 'react';
import { string, number, arrayOf, shape, bool } from 'prop-types';
import { Card, Table } from 'antd';
import styled from 'styled-components';
import Number from './Number';

const { Column } = Table;

const propTypes = {
  className: string,
  quotes: shape({
    stocks: arrayOf(shape({
      stockName: string,
      price: number,
      ratio: number,
    })),
    loading: bool,
  }),
};

const defaultProps = {
  className: null,
  quotes: {},
};

const Quotes = ({ className, quotes }) => (
  <Card title="行情">
    <Table className={className} dataSource={quotes.stocks} size="small" pagination={false}>
      <Column title="股票" dataIndex="name" />
      <Column title="当前价" dataIndex="current" />
      <Column title="涨跌" dataIndex="ratio" render={(text, record) => (<Number>{text}%</Number>)} />
    </Table>
  </Card>
);

Quotes.propTypes = propTypes;
Quotes.defaultProps = defaultProps;

export default styled(Quotes)`
  th,
  td {
    &:nth-child(1) {
      text-align: center;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      text-align: right;
    }
  }
`;
