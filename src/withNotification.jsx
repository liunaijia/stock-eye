import React from 'react';
import { shape, bool } from 'prop-types';
import { sendNotification } from './notification';

const sendTradeSignal = ({
  groupName = '', gap = 0, trade = '', stock = '', price = 0, additional = '',
}) => {
  const title = `${groupName}组合价差${gap}%`;
  const body = `${trade} ${stock} ${price} ${additional}`;
  sendNotification({ title, body });
};

function withNotification(WrappedComponent) {
  const WithNotification = ({ disabled, ...other }) => {
    // console.log('WithNotification disabled?', disabled);
    if (!disabled) {
      const { tradeSuggestion } = other;
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
    }

    return <WrappedComponent {...other} />;
  };

  WithNotification.propTypes = {
    tradeSuggestion: shape(),
    disabled: bool,
  };

  WithNotification.defaultProps = {
    tradeSuggestion: {},
    disabled: false,
  };

  return WithNotification;
}

export default () => withNotification;
