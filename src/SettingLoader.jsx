import { Component } from 'react';
import { connect } from 'react-redux';
import { node, func } from 'prop-types';
import { STOCK_GROUPS } from './settings';

class SettingLoader extends Component {
  static propTypes = {
    addGroup: func.isRequired,
    children: node,
  }

  static defaultProps = {
    children: null,
  }

  componentDidMount() {
    const { addGroup } = this.props;
    Object.entries(STOCK_GROUPS).forEach(([key, group]) => {
      addGroup({ ...group, id: key });
    });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

const mapState = (state, ownProps) => ({
});

const mapDispatch = ({ groups: { add } }, ownProps) => ({
  addGroup: add,
});

export default connect(mapState, mapDispatch)(SettingLoader);
