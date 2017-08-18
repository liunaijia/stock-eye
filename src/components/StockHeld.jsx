import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

import Number from './Number';

const Td = styled.td`
  text-align: ${props => (props.number ? 'right' : 'initial')};
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
    <Td number><Number>{floating}</Number></Td>
    <Td number><Number>{floatingRate}</Number></Td>
  </tr>);
}

StockHeld.propTypes = propTypes;

export default StockHeld;
