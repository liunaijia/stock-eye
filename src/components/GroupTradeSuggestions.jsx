import React from 'react';
import { string, shape, func } from 'prop-types';
import { Card } from 'antd';
import styled from 'styled-components';

import StockTradeSuggestion from './StockTradeSuggestion';

const CardTitle = styled.span`
  color: var(${({ tradeType }) => (tradeType === 'buy' ? '--red' : '--green')});
`;

const GroupTradeSuggestions = ({
  className, groupName, buyingGap, sellingGap, onPlaceOrder,
}) => (
  <Card className={className} title={groupName}>
    {buyingGap &&
    <Card
      type="inner"
      title={<CardTitle tradeType="buy">买入{buyingGap.toBuy.stockName}{buyingGap.toBuy.price}</CardTitle>}
    >
      <p>
        GAP：[{buyingGap.value}]
        相比：{`${buyingGap.compareWith.stockName} ${buyingGap.compareWith.price}`}
      </p>
      <time>{new Date(buyingGap.timestamp).toLocaleTimeString()}</time>
      <StockTradeSuggestion
        tradeType="buy"
        {...buyingGap.toBuy}
        onPlaceOrder={onPlaceOrder}
      />
    </Card>
    }
    {sellingGap &&
    <Card
      type="inner"
      title={<CardTitle tradeType="sell">卖出{sellingGap.toSell.stockName}{sellingGap.toSell.price}</CardTitle>}
    >
      <p>
        GAP：[{sellingGap.value}]
        相比：{`${sellingGap.compareWith.stockName} ${sellingGap.compareWith.price}`}
      </p>
      <time>{new Date(sellingGap.timestamp).toLocaleTimeString()}</time>
      <StockTradeSuggestion
        tradeType="sell"
        {...sellingGap.toSell}
        onPlaceOrder={onPlaceOrder}
      />
    </Card>
    }
  </Card>
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
