import { connect } from 'react-redux';
import store from '../../store';
import LiteHq from './LiteHq';

const mapState = state => ({
  stockCodes: store.select.groups.allStockCodes(state),
});

export default connect(mapState)(LiteHq);
