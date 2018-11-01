
import React from 'react';
import WithQuotes from './WithQuotes';
import LiteQuotes from './LiteQuotes';

const LiteHq = props => (
  <WithQuotes {...props}>
    {quotes => <LiteQuotes quotes={quotes} />}
  </WithQuotes>
);

export default LiteHq;
