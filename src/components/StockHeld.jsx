import React from 'react';
import { string, number } from 'prop-types';

const propTypes = {
  stockName: string.isRequired,
  stockAmount: number.isRequired,
  sellableAmount: number.isRequired,
  floating: number.isRequired,
  floatingRate: string.isRequired,
};

function StockHeld({ stockName, stockAmount, sellableAmount, floating, floatingRate }) {
  return (<tr>
    <td>{stockName}</td>
    <td>{stockAmount}</td>
    <td>{sellableAmount}</td>
    <td>{floating}</td>
    <td>{floatingRate}</td>
  </tr>);
}

StockHeld.propTypes = propTypes;

export default StockHeld;
