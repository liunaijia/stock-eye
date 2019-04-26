import React from 'react';
import { string, number, oneOfType } from 'prop-types';
import styled from 'styled-components';

const sign = value => Math.sign(value);

const NumberRate = ({ className, value, rate }) => {
  if (value === null) return null;

  const signChar = sign(value) >= 0 ? '+' : '';
  const rateString = typeof (rate) === 'string' ? rate : `${rate.toFixed(2)}%`;
  return (
    <span className={className}>
      {`${value.toFixed(2)} (${signChar}${rateString})`}
    </span>
  );
};

NumberRate.propTypes = {
  className: string,
  value: number,
  rate: oneOfType([string, number]),
};

NumberRate.defaultProps = {
  className: null,
  value: null,
  rate: null,
};

export default styled(NumberRate)`
  color: var(${props => (sign(props.value) >= 0 ? '--red' : '--green')});
`;
