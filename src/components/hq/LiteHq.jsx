
import React from 'react';
import { STOCK_CODES } from '../../settings';
import withQuotes from '../withQuotes';
import LiteQuotes from './LiteQuotes';

const QuotesContainer = withQuotes(LiteQuotes);

const LiteHq = () => <QuotesContainer stockCodes={STOCK_CODES} />;

export default LiteHq;
