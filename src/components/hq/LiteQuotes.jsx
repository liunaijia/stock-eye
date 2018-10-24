import React from 'react';
import {
  string, number, arrayOf, shape, bool,
} from 'prop-types';
import { List } from 'antd';
import styled from 'styled-components';
import Number from '../Number';

const propTypes = {
  className: string,
  quotes: shape({
    stocks: arrayOf(shape({
      name: string,
      price: number,
      currentRatio: number,
    })),
    loading: bool,
  }),
};

const defaultProps = {
  className: null,
  quotes: {},
};

const Quotes = ({ className, quotes }) => (
  <List
    className={className}
    dataSource={quotes.stocks || []}
    size="small"
    renderItem={item => (
      <List.Item title={item.current}>
        <span className="title">
          {item.name.match(/[^A-Z]/)[0]}
        </span>
        <Number>
          {item.currentRatio.toFixed(2)}
          %
        </Number>
      </List.Item>)
  }
  />
);

Quotes.propTypes = propTypes;
Quotes.defaultProps = defaultProps;

export default styled(Quotes)`
  opacity: 0.8;

  .title {
    color: #808080;
  }
`;
