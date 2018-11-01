import { Component } from 'react';
import { connect } from 'react-redux';
import {
  any, arrayOf, shape, func,
} from 'prop-types';
import store from '../store';
import { runDuringTradeTime } from '../jobs/job';

class QuotesFetcher extends Component {
  static propTypes = {
    groups: arrayOf(shape({
      stocks: any,
      lookBackDays: any,
    })),
    stockCodes: arrayOf(any),
    fetchHistoryQuotes: func.isRequired,
    fetchCurrentQuotes: func.isRequired,
  }

  static defaultProps = {
    groups: [],
    stockCodes: [],
  }

  componentDidMount() {
    // init fetch
    this.fetchHistoryQuotes();
    this.watchCurrentQuotes();
  }

  componentDidUpdate(prevProps) {
    const { groups, stockCodes } = this.props;
    const { groups: prevGroups, stockCodes: prevStockCodes } = prevProps;

    if (groups !== prevGroups) {
      // when groups change fetch history quotes again
      this.fetchHistoryQuotes();
    }

    if (stockCodes !== prevStockCodes) {
      // when stock codes change fetch current quotes again
      this.watchCurrentQuotes();
    }
  }

  fetchHistoryQuotes() {
    const { groups, fetchHistoryQuotes } = this.props;
    // fetch history quotes for all stocks
    groups.forEach((group) => {
      fetchHistoryQuotes({ stockCodes: group.stocks, lookBackDays: group.lookBackDays });
    });
  }

  watchCurrentQuotes() {
    const { stockCodes, fetchCurrentQuotes } = this.props;

    // cancel previous watching job
    if (this.cancelJob) {
      this.cancelJob();
    }
    this.cancelJob = runDuringTradeTime({
      interval: 3, runOnStartUp: true,
    })(() => {
      console.log('fetchCurrentQuotes', stockCodes);
      if (stockCodes.length) {
        fetchCurrentQuotes({ stockCodes });
      }
    });
  }

  render() {
    return null;
  }
}

const mapState = state => ({
  groups: store.select.groups.allGroups(state),
  stockCodes: store.select.groups.allStockCodes(state),
  // some: store.select.historyQuotes.get(state)('sh601328', new Date('2018-10-30')),
});

const mapDispatch = ({
  historyQuotes: { fetch: fetchHistoryQuotes },
  currentQuotes: { fetch: fetchCurrentQuotes },
}) => ({
  fetchHistoryQuotes,
  fetchCurrentQuotes,
});

export default connect(mapState, mapDispatch)(QuotesFetcher);
