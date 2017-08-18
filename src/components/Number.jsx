import React from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: string,
  children: node,
};

const defaultProps = {
  className: null,
  children: null,
};

function Number({ className, children }) {
  return <span className={className}>{children}</span>;
}

Number.propTypes = propTypes;
Number.defaultProps = defaultProps;

export default styled(Number)`
  color: ${props => (/^\s*-/.test(props.children) ? 'green' : 'red')};
`;
