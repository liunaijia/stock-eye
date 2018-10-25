
import React from 'react';
import { STOCK_CODES } from '../../settings';
import WithQuotes from './WithQuotes';
import LiteQuotes from './LiteQuotes';

const LiteHq = () => (
  <WithQuotes stockCodes={STOCK_CODES}>
    {quotes => <LiteQuotes quotes={quotes} />}
  </WithQuotes>
);

export default LiteHq;
