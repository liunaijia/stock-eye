import React from 'react';
import { number, string } from 'prop-types';
import Number from '../Number';

const Floating = ({ floating, floatingRate }) => {
  if (floating === null) {
    return null;
  }

  const sign = Math.sign(floating) >= 0 ? '+' : '';
  return (<Number>{floating} ({sign}{floatingRate})</Number>);
};

Floating.propTypes = {
  floating: number,
  floatingRate: string,
};

Floating.defaultProps = {
  floating: null,
  floatingRate: null,
};

export default Floating;
