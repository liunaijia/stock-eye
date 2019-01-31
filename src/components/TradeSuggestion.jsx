import { useContext } from 'react';
import { sendNotification } from '../notification';
import { suggestionsSelector } from '../models/selectors';
import { StoreContext } from '../contexts';

const sendTradeSignal = ({
  groupName = '', gap = 0, trade = '', stock = '', price = 0, additional = '',
}) => {
  const title = `${groupName}组合价差${gap}%`;
  const body = `${trade} ${stock} ${price} ${additional}`;
  sendNotification({ title, body });
};

const TradeSuggestion = () => {
  const store = useContext(StoreContext);
  const suggestions = suggestionsSelector(store);
  // console.log(suggestions);

  suggestions.forEach(({
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

  return null;
};


export default TradeSuggestion;
