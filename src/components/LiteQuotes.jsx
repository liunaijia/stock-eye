import React from 'react';
import {
  string, number, arrayOf, shape,
} from 'prop-types';
import styled from 'styled-components';
import Number from './Number';

const Quotes = ({ className, quotes }) => (
  <ul className={className}>
    {quotes.map(item => (
      <li key={item.name}>
        <span className="title">{item.name.match(/[^A-Z]/)[0]}</span>
        <Number>
          {`${item.currentRatio.toFixed(2)}%`}
        </Number>
      </li>
    ))}
  </ul>
);

Quotes.propTypes = {
  className: string,
  quotes: arrayOf(shape({
    name: string,
    price: number,
    currentRatio: number,
  })),
};
Quotes.defaultProps = {
  className: null,
  quotes: [],
};

export default styled(Quotes)`
  opacity: 0.8;
  list-style: none;
  padding: 0;

  li {
    padding: 4px 8px;
    line-height: 2rem;
    border-bottom: solid 1px #ddd;

    .title {
      color: #808080;
      margin-right: 4px;
    }
  }
`;
