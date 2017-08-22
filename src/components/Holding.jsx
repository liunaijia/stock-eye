// @flow
import React from 'react';

import Number from './Number';

type Props = {
  stockName?: string,
  stockAmount?: number,
  sellableAmount?: number,
  floating?: number,
  floatingRate?: string
};

function Holding({ stockName, stockAmount, sellableAmount, floating, floatingRate }: Props) {
  return (
    <tr>
      <td>{stockName}</td>
      <td>{stockAmount}</td>
      <td>{sellableAmount}</td>
      <td><Number>{floating} ({floatingRate})</Number></td>
    </tr>
  );
}

Holding.defaultProps = {
  stockName: '',
  stockAmount: 0,
  sellableAmount: 0,
  floating: 0.00,
  floatingRate: '0%',
};

export default Holding;
