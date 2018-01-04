import React from 'react';
import { bool, number, arrayOf, object } from 'prop-types';
import { Spin, Card } from 'antd';

import Holdings from './Holdings';

const propTypes = {
  availableCash: number,
  holdings: arrayOf(object),
  isLoading: bool,
};

const defaultProps = {
  availableCash: Number.NaN,
  holdings: [],
  isLoading: false,
};

const Portfolio = ({ availableCash, holdings, isLoading }) => (
  <Card title="持仓">
    <Spin spinning={isLoading}>
      <p>可用资金：{availableCash}</p>
      <Holdings holdings={holdings} />
    </Spin>
  </Card>
);

Portfolio.propTypes = propTypes;
Portfolio.defaultProps = defaultProps;

export default Portfolio;
