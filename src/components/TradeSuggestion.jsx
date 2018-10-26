import { Component } from 'react';
import { func } from 'prop-types';
import { fetchStocks } from '../stockData';
import { STOCK_GROUPS } from '../settings';
import { calcBuyingGap, calcSellingGap } from '../gapService';
import { runDuringTradeTime } from '../jobs/job';

class TradeSuggestion extends Component {
  static propTypes = {
    children: func.isRequired,
  }

  state = {
    suggestions: [],
  }

  componentDidMount() {
    runDuringTradeTime({ interval: 3, runOnStartUp: true })(async () => {
      const suggestions = [];
      // console.log('TradeSuggesion is fetching stock data');

      await Promise.all(Object.entries(STOCK_GROUPS).map(async ([groupName, group]) => {
        const stocks = await fetchStocks(group.stocks, group.lookBackDays);

        // calculate gap to buy stock
        const buyingGap = calcBuyingGap(stocks);

        // calculate gap to sell holding stock
        const sellingGap = calcSellingGap(stocks);

        suggestions.push({
          groupName,
          buyingGap,
          sellingGap,
          threshold: group.threshold,
        });
      }));

      this.setState({ suggestions });
    });
  }

  render() {
    const { children } = this.props;
    const { suggestions } = this.state;
    return children(suggestions);
  }
}

export default TradeSuggestion;
