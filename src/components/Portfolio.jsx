import React from 'react';
import { bool, number, arrayOf, object } from 'prop-types';

import Holdings from './Holdings';
import ProgressBar from './ProgressBar';

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
  <section>
    <h1>持仓</h1>
    <ProgressBar visible={isLoading} />
    <section>
      <h2>可用资金：{availableCash}</h2>
    </section>
    <section>
      <Holdings holdings={holdings} />
    </section>
  </section>
);

Portfolio.propTypes = propTypes;
Portfolio.defaultProps = defaultProps;

export default Portfolio;
