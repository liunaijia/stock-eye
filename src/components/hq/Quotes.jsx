import React from 'react';
import {
  string, number, arrayOf, shape, bool,
} from 'prop-types';
import { Table } from 'antd';
import styled from 'styled-components';
import NumberRate from '../NumberRate';

const { Column } = Table;

const propTypes = {
  className: string,
  groupName: string,
  quotes: shape({
    stocks: arrayOf(shape({
      name: string,
      price: number,
      currentRatio: number,
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

const StockChange = ({ current, previous, ratio }) => {
  const change = ((current * 1000) - (previous * 1000)) / 1000;
  return <NumberRate value={change} rate={ratio} />;
};

const Quotes = ({
  className, groupName, quotes, holdings,
}) => {
  const data = quotesWithHoldings(quotes.stocks, holdings);
  return (
    <Table className={className} dataSource={data} size="small" pagination={false} rowKey="name" title={() => groupName}>
      <Column title="股票" dataIndex="name" />
      <Column title="现价" dataIndex="current" render={value => value.toFixed(2)} />
      <Column
        title="今日涨跌"
        dataIndex="currentRatio"
        render={(_, record) => <StockChange current={record.current} previous={record.closeAt} ratio={record.currentRatio} />}
      />
      <Column title="持有量" dataIndex="holding.stockAmount" />
      <Column
        title="持有市值"
        dataIndex="holdingValue"
        render={(_, record) => (record.holding.stockAmount ? (record.current * 1000 * record.holding.stockAmount) / 1000 : null)}
      />
      <Column
        title="浮动盈亏"
        dataIndex="floating"
        render={(_, record) => <NumberRate value={record.holding.floating} rate={record.holding.floatingRate} />}
      />
      <Column title="参考价" dataIndex="baseAt" render={value => value.toFixed(2)} />
      <Column
        title="参考涨跌"
        dataIndex="baseRatio"
        render={(_, record) => <StockChange current={record.current} previous={record.baseAt} ratio={record.baseRatio} />}
      />
      <Column title="买进GAP" dataIndex="buyGap.value" />
      <Column title="卖出GAP" dataIndex="sellGap.value" />
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
