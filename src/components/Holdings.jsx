import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import { Table } from 'antd';
import NumberRate from './NumberRate';

const { Column } = Table;

const propTypes = {
  className: string,
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
  holdings: [],
};

const Holdings = ({ className, holdings }) => (
  <Table className={className} dataSource={holdings} size="small" pagination={false} rowKey={record => record.stockCode}>
    <Column title="股票" dataIndex="stockName" />
    <Column title="持有量" dataIndex="stockAmount" />
    <Column title="可卖量" dataIndex="sellableAmount" />
    <Column
      title="浮动盈亏"
      key="floating"
      render={(_, record) => <NumberRate value={record.floating} rate={record.floatingRate} />
    }
    />
  </Table>
);

Holdings.propTypes = propTypes;
Holdings.defaultProps = defaultProps;

export default styled(Holdings)`
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
