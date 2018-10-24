import React, { Component } from 'react';
import { arrayOf, string } from 'prop-types';
import { fetchStocks } from '../stockData';
import { runDuringTradeTime } from '../jobs/job';

function withQuotes(WrappedComponent) {
  return class extends Component {
    static propTypes = {
      stockCodes: arrayOf(string),
    }

    static defaultProps = {
      stockCodes: null,
    }

    state = {
      stocks: null,
      loading: false,
    }

    componentDidMount() {
      runDuringTradeTime({ interval: 3, runOnStartUp: true })(async () => {
        this.setState({ ...this.state, loading: true });
        const stocks = await fetchStocks(this.props.stockCodes, this.props.lookbackDays);
        // console.log('QuotesContainer is fetching stock data');
        this.setState({ stocks, loading: false });
      });
    }

    render() {
      return <WrappedComponent {...this.props} quotes={this.state} />;
    }
  };
}

export default withQuotes;
