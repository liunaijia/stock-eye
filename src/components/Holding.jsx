import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  stockName: string,
  stockAmount: number,
  sellableAmount: number,
  floating: number,
  floatingRate: string,
};

const defaultProps = {
  stockName: null,
  stockAmount: null,
  sellableAmount: null,
  floating: null,
  floatingRate: null,
};

function Holding({
  stockName, stockAmount, sellableAmount, floating, floatingRate,
}) {
  return (
    <tr>
      <td>{stockName}</td>
      <td>{stockAmount}</td>
      <td>{sellableAmount}</td>
      <Number>{floating} ({floatingRate})</Number>
    </tr>
  );
}

const Number = styled.td`
  color: var(${props => (/^\s*-/.test(props.children) ? '--green' : '--red')});
`;

Holding.propTypes = propTypes;
Holding.defaultProps = defaultProps;

export default Holding;
