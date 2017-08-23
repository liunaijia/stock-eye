// @flow
import React from 'react';
import styled from 'styled-components';

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
      <Number>{floating} ({floatingRate})</Number>
    </tr>
  );
}

const Number = styled.td`
  color: ${props => (/^\s*-/.test(props.children) ? '#383' : '#c10')};
`;

Holding.defaultProps = {
  stockName: '',
  stockAmount: 0,
  sellableAmount: 0,
  floating: 0.00,
  floatingRate: '0%',
};

export default Holding;
