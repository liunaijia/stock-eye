import React from 'react';
import { bool, number, arrayOf, object } from 'prop-types';
import { Spin, Card } from 'antd';

import Holdings from './Holdings';

const Portfolio = ({ availableCash, holdings, isLoading }) => (
  <Card title="持仓">
    <Spin spinning={isLoading}>
      <p>可用资金：{availableCash}</p>
      <Holdings holdings={holdings} />
    </Spin>
  </Card>
);

Portfolio.propTypes = {
  availableCash: number,
  holdings: arrayOf(object),
  isLoading: bool,
};

Portfolio.defaultProps = {
  availableCash: Number.NaN,
  holdings: [],
  isLoading: false,
};

export default Portfolio;
