import React from 'react';
import { string, number, arrayOf, shape, bool } from 'prop-types';
import { Table } from 'antd';
import styled from 'styled-components';
import Number from '../Number';

const { Column } = Table;

const propTypes = {
  className: string,
  groupName: string,
  quotes: shape({
    stocks: arrayOf(shape({
      name: string,
      price: number,
      ratio: number,
    })),
    loading: bool,
  }),
  holdings: arrayOf(shape({
    stockCode: string,
    stockName: string,
    stockAmount: number,
    sellableAmount: number,
    floating: number,
    floatingRate: string,
  })),
};

const defaultProps = {
  className: null,
  groupName: null,
  quotes: {},
  holdings: [],
};

const quotesWithHoldings = (stocks, holdings) => (stocks || [])
  .map(stock => ({
    ...stock,
    holding: holdings.find(holding => holding.stockCode === stock.code) || {},
  }));

const sign = number => (Math.sign(number) >= 0 ? '+' : '');

const StockChange = ({ current, closeAt, ratio }) => {
  const change = ((current * 1000) - (closeAt * 1000)) / 1000;
  return (
    <Number>
      {change} ({sign(ratio)}{ratio.toFixed(2)}%)
    </Number>);
};

const Floating = ({ floating, floatingRate }) => (
  floating ? <Number>{floating} ({floatingRate})</Number> : null
);

const Quotes = ({
  className, groupName, quotes, holdings,
}) => {
  const data = quotesWithHoldings(quotes.stocks, holdings);
  return (
    <Table className={className} dataSource={data} size="small" pagination={false} rowKey="name" title={() => groupName}>
      <Column title="股票" dataIndex="name" />
      <Column title="当前价" dataIndex="current" />
      <Column title="持有量" dataIndex="holding.stockAmount" />
      <Column
        title="持有市值"
        dataIndex="holdingValue"
        render={(_, record) =>
         (record.holding.stockAmount ? record.current * record.holding.stockAmount : null)}
      />
      <Column
        title="浮动盈亏"
        dataIndex="floating"
        render={(_, record) => <Floating {...record.holding} />}
      />
      <Column title="买进GAP" dataIndex="buyGap.value" />
      <Column title="卖出GAP" dataIndex="sellGap.value" />
      <Column
        title="涨跌"
        dataIndex="ratio"
        render={(_, record) => <StockChange {...record} />}
      />
    </Table>
  );
};

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
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      text-align: right;
    }
  }
`;
