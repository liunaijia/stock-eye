import React from 'react';
import {
  string, number, arrayOf, shape, func,
} from 'prop-types';
import styled from 'styled-components';
import IconButton from './IconButton';
import NumberRate from './NumberRate';

const propTypes = {
  className: string,
  quotes: arrayOf(shape({
    name: string,
    price: number,
    currentRatio: number,
  })),
  onWatch: func,
  stockCodeInWatch: string,
  groupName: string,
};

const defaultProps = {
  className: null,
  quotes: [],
  onWatch: undefined,
  stockCodeInWatch: undefined,
  groupName: undefined,
};

const StockChange = ({ current, previous, ratio }) => {
  const change = ((current * 1000) - (previous * 1000)) / 1000;
  return <NumberRate value={change} rate={ratio} />;
};

StockChange.propTypes = {
  current: number.isRequired,
  previous: number.isRequired,
  ratio: number.isRequired,
};


const Quotes = ({
  className, groupName, quotes, onWatch, stockCodeInWatch,
}) => {
  const renderWatchSwitch = record => (
    <IconButton
      type={record.stockCode === stockCodeInWatch ? 'primary' : 'default'}
      onClick={() => onWatch && onWatch({ target: { value: record.stockCode } })}
    >
      visibility
    </IconButton>
  );

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>{groupName}</th>
          <th>现价</th>
          <th>今日涨跌</th>
          <th>参考价</th>
          <th>参考涨跌</th>
          <th>买进GAP</th>
          <th>卖出GAP</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {quotes.map(record => (
          <tr key={record.name}>
            <td>{record.name}</td>
            <td>{record.current.toFixed(2)}</td>
            <td>
              <StockChange current={record.current} previous={record.closeAt} ratio={record.currentRatio} />
            </td>
            <td>{record.baseAt.toFixed(2)}</td>
            <td>
              <StockChange current={record.current} previous={record.baseAt} ratio={record.baseRatio} />
            </td>
            <td>{record.buyGap.value}</td>
            <td>{record.sellGap.value}</td>
            <td>{renderWatchSwitch(record)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Quotes.propTypes = propTypes;
Quotes.defaultProps = defaultProps;

export default styled(Quotes)`
  width: 100%;
  border-collapse: collapse;

  tr {
    border-bottom: solid 1px var(--border-color);
  }

  th,
  td {
    padding: var(--size-1);

    &:nth-child(1) {
      text-align: center;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      text-align: right;
    }
  }
`;
