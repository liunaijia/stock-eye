import React from 'react';
import { string, number } from 'prop-types';

import Number from './Number';

const propTypes = {
  stockName: string.isRequired,
  stockAmount: number.isRequired,
  sellableAmount: number.isRequired,
  floating: number.isRequired,
  floatingRate: string.isRequired,
};

function Holding({ stockName, stockAmount, sellableAmount, floating, floatingRate }) {
  return (
    <tr>
      <td>{stockName}</td>
      <td>{stockAmount}</td>
      <td>{sellableAmount}</td>
      <td><Number>{floating} ({floatingRate})</Number></td>
    </tr>
  );
}

Holding.propTypes = propTypes;

export default Holding;
