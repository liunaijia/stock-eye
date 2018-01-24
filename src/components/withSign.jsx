import React from 'react';

const withSign = (value, WrappedComponent) => {
  if (value === null) { return null; }

  const sign = Math.sign(value) >= 0 ? '+' : '';
  return <WrappedComponent {...this.props} sign={sign} />;
};

export default withSign;
