import React from 'react';
import { arrayOf, number, shape, oneOf } from 'prop-types';

const propTypes = {
  type: oneOf(['buy', 'sell']).isRequired,
  bids: arrayOf(shape({
    price: number.isRequired,
    amount: number.isRequired,
  })),
};

const defaultProps = {
  order: 'buy',
  bids: [],
};

const Bids = ({ type, bids }) => (
  <ul className={type}>
    {bids.map(bid => (
      <li key={String(bid.price).replace('.', '')}>
        <span>{bid.price}</span>
        <span>{bid.amount}</span>
      </li>
    ))}
  </ul>
);

Bids.propTypes = propTypes;
Bids.defaultProps = defaultProps;

export default Bids;
