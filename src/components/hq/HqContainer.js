import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Hq from './Hq';
import { getGroupedQuotes } from '../../models/selectors';

const mapState = createStructuredSelector({
  quotes: getGroupedQuotes,
});

export default connect(mapState)(Hq);
