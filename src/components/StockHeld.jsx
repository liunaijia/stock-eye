import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

import Number from './Number';

const propTypes = {
  className: string,
  stockName: string.isRequired,
  stockAmount: number.isRequired,
  sellableAmount: number.isRequired,
  floating: number.isRequired,
  floatingRate: string.isRequired,
};

const defaultProps = {
  className: null,
};

function StockHeld({ className, stockName, stockAmount, sellableAmount, floating, floatingRate }) {
  return (
    <tr className={className}>
      <td>{stockName}</td>
      <td>{stockAmount}</td>
      <td>{sellableAmount}</td>
      <td><Number>{floating}</Number></td>
      <td><Number>{floatingRate}</Number></td>
    </tr>
  );
}

StockHeld.propTypes = propTypes;
StockHeld.defaultProps = defaultProps;

export default styled(StockHeld)`
  td {
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      text-align: right;
    }
`;
