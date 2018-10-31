import { connect } from 'react-redux';
import Hq from './Hq';

const mapState = state => ({
  groups: state.groups,
});

export default connect(mapState)(Hq);
