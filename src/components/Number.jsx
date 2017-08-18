import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: node,
};

const defaultProps = {
  children: null,
};

const Span = styled.span`
  color: ${props => (/^\s*-/.test(props.children) ? 'green' : 'red')};
`;

function Number({ children }) {
  return <Span>{children}</Span>;
}

Number.propTypes = propTypes;
Number.defaultProps = defaultProps;

export default Number;
