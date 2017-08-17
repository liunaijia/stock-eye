import React from 'react';
import PropTypes from 'prop-types';

const StockHeld = ({ stockName, stockAmount, sellableAmount, floating, floatingRate }) =>
  (<tr>
    <td>{stockName}</td>
    <td>{stockAmount}</td>
    <td>{sellableAmount}</td>
    <td>{floating}</td>
    <td>{floatingRate}</td>
  </tr>);

const Holdings = ({ balance, stocks }) => (
  <div>
    <h4>可用资金：{balance || '?'}</h4>
    <table>
      <thead>
        <tr>
          <th>股票</th>
          <th>数量</th>
          <th>可卖</th>
          <th colSpan="2">浮动盈亏</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map(stock => (<StockHeld key={stock.stockCode} {...stock} />))}
      </tbody>
    </table>
  </div>
);

Holdings.propTypes = {
  balance: PropTypes.number,
  stocks: PropTypes.array,
};

Holdings.defaultProps = {
  balance: 0,
  stocks: [],
};

export default Holdings;
