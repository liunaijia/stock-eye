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
  availableCash: 0,
  holdings: [],
  isLoading: false,
};

const Portfolio = ({ availableCash, holdings, isLoading }) => (
  <article>
    <ProgressBar visible={isLoading} />
    <header>持仓</header>
    可用资金：{availableCash}
    <Holdings holdings={holdings} />
  </article>
);

Portfolio.propTypes = propTypes;
Portfolio.defaultProps = defaultProps;

export default Portfolio;
