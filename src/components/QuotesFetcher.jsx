import { Component } from 'react';
import { connect } from 'react-redux';
import {
  any, arrayOf, shape, func,
} from 'prop-types';
import store from '../store';

class QuotesFetcher extends Component {
  static propTypes = {
    groups: arrayOf(shape({
      stocks: any,
      lookBackDays: any,
    })),
    fetchHistoryQuotes: func.isRequired,
  }

  static defaultProps = {
    groups: [],
  }

  componentWillMount() {
    this.fetchHistoryQuotes();
  }

  componentDidUpdate({ groups: prevGroups }) {
    const { groups } = this.props;
    if (groups !== prevGroups) {
      this.fetchHistoryQuotes();
    }
  }

  fetchHistoryQuotes() {
    const { groups, fetchHistoryQuotes } = this.props;
    // fetch history quotes for all stocks
    groups.forEach((group) => {
      fetchHistoryQuotes({ stockCodes: group.stocks, lookBackDays: group.lookBackDays });
    });
  }

  render() {
    return null;
  }
}

const mapState = state => ({
  groups: store.select.groups.all(state),
});

const mapDispatch = ({ historyQuotes: { fetch } }) => ({
  fetchHistoryQuotes: fetch,
});

export default connect(mapState, mapDispatch)(QuotesFetcher);
