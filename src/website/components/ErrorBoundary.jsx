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
    const { children } = this.props;
    const { error, errorInfo } = this.state;
    if (error) {
      return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {error && error.toString()}
          {errorInfo.componentStack}
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
