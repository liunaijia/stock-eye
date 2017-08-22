// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string,
  children?: React.Node,
};

function Number({ className, children }: Props) {
  return <span className={className}>{children}</span>;
}

Number.defaultProps = {
  className: null,
  children: null,
};

export default styled(Number) `
  color: ${props => (/^\s*-/.test(props.children) ? '#383' : '#c10')};
`;
