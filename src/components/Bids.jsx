import React from 'react';
import { arrayOf, string, number, shape, oneOf } from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: string,
  type: oneOf(['buy', 'sell']).isRequired,
  bids: arrayOf(shape({
    price: number.isRequired,
    amount: number.isRequired,
  })).isRequired,
  currentPrice: number.isRequired,
};

const defaultProps = {
  className: null,
};

const BidType = styled.span`
  width: 2rem;
`;

const Price = styled.span`
  width: 3rem;
  text-align: right;
`;

const Lot = styled.span`
  flex-grow: 1;
  text-align: right;
`;

const Bid = (index, type, bid, currentPrice) => {
  const key = type + index;

  let vsCurrentPrice = 'equal';
  if (bid.price < currentPrice) vsCurrentPrice = 'lower';
  else if (bid.price > currentPrice) vsCurrentPrice = 'higher';

  return (
    <li key={key} data-vs-current-price={vsCurrentPrice}>
      <BidType>{type === 'buy' ? '买' : '卖'}{index + 1}</BidType>
      <Price>{bid.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Price>
      <Lot>{Math.round(bid.amount / 100)}</Lot>
    </li>
  );
};

const Bids = ({ className, type, bids, currentPrice }) => {
  // There is another way to display selling bids in descending order.
  // flex-direction: ${props => (props.type === 'buy' ? 'column' : 'column-reverse')};
  // However, this makes test code ignorant
  const bidListItems = bids.map((bid, index) => Bid(index, type, bid, currentPrice));
  return (
    <ul className={className}>
      {type === 'sell' ? bidListItems.reverse() : bidListItems}
    </ul>
  );
};

Bids.propTypes = propTypes;
Bids.defaultProps = defaultProps;

export default styled(Bids)`
  padding: 0;

  li {
    display: flex;
    line-height: 1rem;

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
  }
`;
