import { Component } from 'react';
import {
  arrayOf, string, number, func, any,
} from 'prop-types';
import { connect } from 'react-redux';
import { fetchStocks } from '../../stockData';
import { runDuringTradeTime } from '../../jobs/job';

class WithQuotes extends Component {
  static propTypes = {
    lookBackDaysOfStocks: any,
    fetchQuotes: func.isRequired,

    stockCodes: arrayOf(string),
    lookBackDays: number,
    children: func.isRequired,
  }

  static defaultProps = {
    lookBackDaysOfStocks: {},
    stockCodes: null,
    lookBackDays: 1,
  }

  state = {
    quotes: null,
  }

  componentDidUpdate() {
    runDuringTradeTime({ interval: 3, runOnStartUp: true })(async () => {
      const {
        stockCodes, lookBackDays, fetchQuotes, lookBackDaysOfStocks,
      } = this.props;
      // lookBackDaysOfStocks
      // const quotes = await fetchQuotes();
      // console.log(quotes);
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

const mapState = (state, ownProps) => ({
});

const mapDispatch = ({ quotes: { fetch } }, ownProps) => ({
  fetchQuotes: fetch,
});

export default connect(mapState, mapDispatch)(WithQuotes);
