import { useEffect, useState } from 'react';
import { STOCK_GROUPS } from '../settings';

export default () => {
  const [stockGroups, setStockGroups] = useState();

  useEffect(() => {
    // load settings
    setStockGroups(STOCK_GROUPS);
  }, []);

  return stockGroups;
};
