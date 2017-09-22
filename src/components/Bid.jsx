import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: string,
  index: number.isRequired,
  type: string.isRequired,
  price: number.isRequired,
  amount: number.isRequired,
  currentPrice: number.isRequired,
};

const defaultProps = {
  className: null,
};

const BidType = styled.span`
  flex: 1;
`;

const Price = styled.span`
  flex: 1;
  text-align: center;
`;

const Lot = styled.span`
  flex: 1;
  text-align: right;
`;

const Bid = ({ className, index, type, price, amount, currentPrice }) => {
  let vsCurrentPrice = 'equal';
  if (price < currentPrice) vsCurrentPrice = 'lower';
  else if (price > currentPrice) vsCurrentPrice = 'higher';

  return (
    <li className={className} data-vs-current-price={vsCurrentPrice}>
      <BidType>{type === 'buy' ? '买' : '卖'}{index + 1}</BidType>
      <Price>{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Price>
      <Lot>{Math.round(amount / 100)}</Lot>
    </li>
  );
};

Bid.propTypes = propTypes;
Bid.defaultProps = defaultProps;

export default styled(Bid)`
  display: flex;
  line-height: 1.4rem;

  &[data-vs-current-price=higher] {
    span:nth-child(2) {
      color: var(--red);
    }
  }

  &[data-vs-current-price=lower] {
    span:nth-child(2) {
      color: var(--green);
    }
  }
`;
