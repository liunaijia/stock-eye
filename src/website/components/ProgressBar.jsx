import React from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: string,
  visible: bool, // eslint-disable-line react/no-unused-prop-types
};

const defaultProps = {
  className: null,
  visible: false,
};

const ProgressBar = ({ className }) => (
  <div className={`mdl-progress mdl-js-progress mdl-progress__indeterminate ${className}`} />
);

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default styled(ProgressBar)`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;
