import React from 'react';
import { arrayOf, string, number, shape, oneOf } from 'prop-types';
import styled from 'styled-components';

import Bid from './Bid';

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

const Bids = ({ className, type, bids, currentPrice }) => {
  // There is another way to display selling bids in descending order.
  // flex-direction: ${props => (props.type === 'buy' ? 'column' : 'column-reverse')};
  // However, this makes test code ignorant
  const bidListItems = bids.map((bid, index) => (
    <Bid
      key={type + index} // eslint-disable-line react/no-array-index-key
      index={index}
      type={type}
      price={bid.price}
      amount={bid.amount}
      currentPrice={currentPrice}
    />
  ));
  return (
    <ul className={className}>
      {type === 'sell' ? bidListItems.reverse() : bidListItems}
    </ul>
  );
};

Bids.propTypes = propTypes;
Bids.defaultProps = defaultProps;

export default styled(Bids)`
  margin: 0;
  padding: 0;
`;
