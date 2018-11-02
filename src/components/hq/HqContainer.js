import { connect } from 'react-redux';
import Hq from './Hq';
import { getGroupedQuotes } from '../../models/selectors';

const mapState = state => ({
  quotes: getGroupedQuotes(state),
});
export default connect(mapState)(Hq);
