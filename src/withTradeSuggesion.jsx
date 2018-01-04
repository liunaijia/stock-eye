import React, { Component } from 'react';
import { shape } from 'prop-types';
import { fetchStocks } from './stockData';
import { STOCK_GROUPS, STOCK_CODES } from './settings';
import { calcBuyingGap, calcSellingGap } from './gapService';
import { runDuringTradeTime } from './jobs/job';

function withTradeSuggestion(WrappedComponent) {
  return class extends Component {
    static propTypes = {
      portfolio: shape(),
    };

    static defaultProps = {
      portfolio: null,
    }

    state = {
      groups: [],
      loading: false,
    }

    componentDidMount() {
      runDuringTradeTime({ interval: 3, runOnStartUp: false })(async () => {
        this.setState({ ...this.state, loading: true });

        const groups = [];
        const allStocks = await fetchStocks(STOCK_CODES);

        Object.entries(STOCK_GROUPS).forEach(([groupName, group]) => {
          const stockCodesInGroup = Object.keys(group.stocks);
          const stocks = allStocks.filter(stock => stockCodesInGroup.includes(stock.code));

          // calculate gap to buy stock
          const buyingGap = calcBuyingGap(stocks, this.props.portfolio.availableCash);

          // calculate gap to sell holding stock
          const sellingGap = calcSellingGap(stocks, this.props.portfolio.holdings);

          groups.push({
            groupName,
            buyingGap,
            sellingGap,
            threshold: group.threshold,
          });
        });

        this.setState({ groups, loading: false });
      });
    }

    render() {
      return <WrappedComponent {...this.props} tradeSuggestion={this.state} />;
    }
  };
}

export default withTradeSuggestion;
