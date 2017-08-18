import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
  text-align: ${props => (props.number ? 'right' : 'center')};
`;

const propTypes = {
  stockName: string.isRequired,
  stockAmount: number.isRequired,
  sellableAmount: number.isRequired,
  floating: number.isRequired,
  floatingRate: string.isRequired,
};

function StockHeld({ stockName, stockAmount, sellableAmount, floating, floatingRate }) {
  return (<tr>
    <Td>{stockName}</Td>
    <Td number>{stockAmount}</Td>
    <Td number>{sellableAmount}</Td>
    <Td number>{floating}</Td>
    <Td number>{floatingRate}</Td>
  </tr>);
}

StockHeld.propTypes = propTypes;

export default StockHeld;
