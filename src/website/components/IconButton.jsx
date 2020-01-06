import React from 'react';
import { string, node, oneOf } from 'prop-types';
import styled from 'styled-components';
import { classNames } from '../services/util';

const IconButton = ({
  className, children,
  type,
  ...props
}) => (
  <button
    type="button" // default to button and can be overwritten by props
    className={classNames('material-icons', className)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {children}
  </button>
);

IconButton.propTypes = {
  className: string,
  children: node,
  type: oneOf(['primary', 'default']),
};

IconButton.defaultProps = {
  className: undefined,
  children: undefined,
  type: 'default',
};

export default styled(IconButton)`
  border: 1px solid transparent;
  border-color: var(--border-color);
  outline: none;
  padding: 0;
  border-radius: 50%;
  font-size: var(--size-2);
  height: var(--size-3);
  width: var(--size-3);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${({ type }) => type === 'primary' && `
    color: var(--primary-color);
    background: var(--primary-bg-color);
    border-color: var(--primary-bg-color);
  `}

  &:hover {
    color: var(--hover-color);
    background: transparent;
    border-color: var(--hover-color);
  }
`;
