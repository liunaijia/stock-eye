import React from 'react';
import { number, arrayOf, object } from 'prop-types';
import { Paper } from 'material-ui';

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
  <Paper>
    可用资金：{availableCash}
    <Holdings holdings={holdings} />
  </Paper>
);

Portfolio.propTypes = propTypes;
Portfolio.defaultProps = defaultProps;

export default Portfolio;
