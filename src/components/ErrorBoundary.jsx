import React, { Component } from 'react';
import { element, oneOfType, array } from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    children: oneOfType([element, array]),
  };

  static defaultProps = {
    children: null,
  };

  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {this.state.error && this.state.error.toString()}
          {this.state.errorInfo.componentStack}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
