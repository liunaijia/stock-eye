import React from 'react';
import { number, arrayOf, object } from 'prop-types';

import Holdings from './Holdings';

const propTypes = {
  availableCash: number,
  holdings: arrayOf(object),
};

const defaultProps = {
  availableCash: 0,
  holdings: [],
};

const Portfolio = ({ availableCash, holdings }) => (
  <article>
    <header>持仓</header>
    可用资金：{availableCash}
    <Holdings holdings={holdings} />
  </article>
);

Portfolio.propTypes = propTypes;
Portfolio.defaultProps = defaultProps;

export default Portfolio;
