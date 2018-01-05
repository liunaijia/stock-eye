import React, { Component } from 'react';
import { fetchStocks } from '../../stockData';
import { STOCK_CODES } from '../../settings';
import { runDuringTradeTime } from '../../jobs/job';
import Quotes from './Quotes';

function withQuotes(WrappedComponent) {
  return class extends Component {
    state = {
      stocks: null,
      loading: false,
    }

    componentDidMount() {
      runDuringTradeTime({ interval: 3, runOnStartUp: true })(async () => {
        this.setState({ ...this.state, loading: true });
        const stocks = await fetchStocks(this.props.stockCodes);
        console.log('QuotesContainer is fetching stock data');
        this.setState({ stocks, loading: false });
      });
    }

    render() {
      return <WrappedComponent {...this.props} quotes={this.state} />;
    }
  };
}

export default withQuotes(Quotes);
