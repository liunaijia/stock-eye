import React from 'react';
import { string, shape, func } from 'prop-types';

import StockTradeSuggestion from './StockTradeSuggestion';

const GroupTradeSuggestions = ({
  className, groupName, buyingGap, sellingGap, onPlaceOrder,
}) => (
  <article className={className}>
    <h1>{groupName}</h1>
    {buyingGap &&
    <section>
      <div>
        买入 {buyingGap.toBuy.stockName}
        GAP：[{buyingGap.value}]
        相比：{`${buyingGap.compareWith.stockName} ${buyingGap.compareWith.price}`}
      </div>
      <time>{new Date(buyingGap.timestamp).toLocaleTimeString()}</time>
      <StockTradeSuggestion
        tradeType="buy"
        {...buyingGap.toBuy}
        onPlaceOrder={onPlaceOrder}
      />
    </section>
    }
    {sellingGap &&
    <section>
      <div>
        卖出 {sellingGap.toSell.stockName}
        GAP：[{sellingGap.value}]
        相比：{`${sellingGap.compareWith.stockName} ${sellingGap.compareWith.price}`}
      </div>
      <time>{new Date(sellingGap.timestamp).toLocaleTimeString()}</time>
      <StockTradeSuggestion
        tradeType="sell"
        {...sellingGap.toSell}
        onPlaceOrder={onPlaceOrder}
      />
    </section>
    }
  </article>
);

GroupTradeSuggestions.propTypes = {
  className: string,
  groupName: string,
  buyingGap: shape(),
  sellingGap: shape(),
  onPlaceOrder: func.isRequired,
};

GroupTradeSuggestions.defaultProps = {
  className: null,
  groupName: null,
  buyingGap: null,
  sellingGap: null,
};

export default GroupTradeSuggestions;
