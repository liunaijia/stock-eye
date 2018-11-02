import { connect } from 'react-redux';
import LiteHq from './LiteHq';
import { getAllQuotes } from '../../models/selectors';

const mapState = state => ({
  quotes: getAllQuotes(state),
});

export default connect(mapState)(LiteHq);
