import { createSelector } from 'reselect';
import { calcBuyingGap, calcSellingGap } from './gapService';

export const allQuotesSelector = createSelector(
  store => store.quotes,
  (quotes = []) => quotes.reduce((result, group) => result.concat(group.groupQuotes), []),
);

export const suggestionsSelector = createSelector(
  store => store.groups,
  store => store.quotes,
  (groups, quotes = []) => quotes.map(group => ({
    groupName: group.groupName,
    buyingGap: calcBuyingGap(group.groupQuotes),
    sellingGap: calcSellingGap(group.groupQuotes),
    threshold: groups[group.groupName].threshold,
  })),
);
