import React, { Component } from 'react';
import { node } from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

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

ErrorBoundary.propTypes = {
  children: node,
};

ErrorBoundary.defaultProps = {
  children: undefined,
};

export default ErrorBoundary;
