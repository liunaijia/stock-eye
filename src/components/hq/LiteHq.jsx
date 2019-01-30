
import React, { useContext } from 'react';
import LiteQuotes from './LiteQuotes';
import { GroupsContext } from '../../contexts';
import { allQuotesSelector } from '../../models/selectors';

const LiteHq = () => {
  const groups = useContext(GroupsContext);
  const allQuotes = allQuotesSelector(groups);
  return (
    <LiteQuotes quotes={allQuotes} />
  );
};

export default LiteHq;
