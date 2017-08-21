import React from 'react';
import { number, arrayOf, object } from 'prop-types';
// import styled from 'styled-components';

import Bids from './Bids';

const propTypes = {
  currentPrice: number,
  buyingBids: arrayOf(object),
  sellingBids: arrayOf(object),
};

const defaultProps = {
  currentPrice: 0,
  buyingBids: [],
  sellingBids: [],
};

const Quotes = ({ currentPrice, buyingBids, sellingBids }) => (
  <div>
    <Bids type="sell" bids={sellingBids} currentPrice={currentPrice} />
    <Bids type="buy" bids={buyingBids} currentPrice={currentPrice} />
  </div>
);

Quotes.propTypes = propTypes;
Quotes.defaultProps = defaultProps;

export default Quotes;
