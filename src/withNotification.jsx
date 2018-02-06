import React from 'react';
import { shape } from 'prop-types';
import { sendNotification } from './notification';

const sendTradeSignal = ({
  groupName = '', gap = 0, trade = '', stock = '', price = 0, additional = '',
}) => {
  const title = `${groupName}组合价差${gap}%`;
  const body = `${trade} ${stock} ${price} ${additional}`;
  sendNotification({ title, body });
};

function withNotification(WrappedComponent) {
  const WithNotification = (props) => {
    const { tradeSuggestion } = props;
    const { groups } = tradeSuggestion;
    groups.forEach(({
      groupName, buyingGap, sellingGap, threshold,
    }) => {
      if (buyingGap && buyingGap.value >= threshold) {
        sendTradeSignal({
          groupName,
          gap: buyingGap.value,
          trade: '买',
          stock: buyingGap.toBuy.stockName,
          price: buyingGap.toBuy.price,
          additional: `相比${buyingGap.compareWith.stockName} ${buyingGap.compareWith.price}`,
        });
      }

      if (sellingGap && sellingGap.value >= threshold) {
        sendTradeSignal({
          groupName,
          gap: sellingGap.value,
          trade: '卖',
          stock: sellingGap.toSell.stockName,
          price: sellingGap.toSell.price,
          additional: `相比${sellingGap.compareWith.stockName} ${sellingGap.compareWith.price}`,
        });
      }
    });

    return <WrappedComponent {...props} />;
  };

  WithNotification.propTypes = {
    tradeSuggestion: shape(),
  };

  WithNotification.defaultProps = {
    tradeSuggestion: {},
  };

  return WithNotification;
}

export default () => withNotification;
