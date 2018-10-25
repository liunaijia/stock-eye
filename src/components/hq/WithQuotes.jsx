import { Component } from 'react';
import {
  arrayOf, string, number, func,
} from 'prop-types';
import { fetchStocks } from '../../stockData';
import { runDuringTradeTime } from '../../jobs/job';

class WithQuotes extends Component {
  static propTypes = {
    stockCodes: arrayOf(string),
    lookBackDays: number,
    children: func.isRequired,
  }

  static defaultProps = {
    stockCodes: null,
    lookBackDays: 1,
  }

  state = {
    quotes: null,
  }

  componentDidMount() {
    const { stockCodes, lookBackDays } = this.props;
    runDuringTradeTime({ interval: 3, runOnStartUp: true })(async () => {
      const quotes = await fetchStocks(stockCodes, lookBackDays);
      // console.log('QuotesContainer is fetching stock data');
      this.setState({ quotes });
    });
  }

  render() {
    const { children } = this.props;
    const { quotes } = this.state;
    return children(quotes);
  }
}

export default WithQuotes;
