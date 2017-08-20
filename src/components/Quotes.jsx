import React from 'react';
import { number, arrayOf, object } from 'prop-types';
// import styled from 'styled-components';

import Bids from './Bids';

const propTypes = {
  currentPrice: number.isRequired,
  buyingBids: arrayOf(object).isRequired,
  sellingBids: arrayOf(object).isRequired,
};

const Quotes = ({ currentPrice, buyingBids, sellingBids }) => (
  <div>
    <Bids type="sell" bids={sellingBids} currentPrice={currentPrice} />
    <Bids type="buy" bids={buyingBids} currentPrice={currentPrice} />
  </div>
);

Quotes.propTypes = propTypes;

export default Quotes;
// export default styled(Quotes)``;
