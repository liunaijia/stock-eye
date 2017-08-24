import React, { Component } from 'react';
import { string, number, func, oneOf } from 'prop-types';
import styled from 'styled-components';

class TradeForm extends Component {
  static propTypes = {
    className: string,
    tradeType: oneOf(['buy', 'sell']).isRequired,
    stockCode: string,
    stockName: string,
    price: number,
    maxAmount: number,
    onSubmit: func.isRequired,
  }

  static defaultProps = {
    className: null,
    stockCode: null,
    stockName: null,
    price: null,
    maxAmount: null,
  }

  state = {
    stockCode: this.props.stockCode,
    price: this.props.price,
    amount: this.props.maxAmount,
  }

  handleSubmit = (event = new Event()) => {
    event.preventDefault();
    const { stockCode, price, amount } = this.state;
    this.props.onSubmit({ stockCode, price, amount });
  }

  handleChange = (event = new Event()) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { className, tradeType, stockName, maxAmount } = this.props;
    return (
      <form className={className} onSubmit={this.handleSubmit}>
        <p>
          股票：<input name="stockName" value={stockName} readOnly />
          <input name="stockCode" value={this.state.stockCode} type="hidden" />
        </p>
        <p>
          价格：<input name="price" value={this.state.price} type="number" required onChange={this.handleChange} />
        </p>
        <p>
          数量：<input name="amount" value={this.state.amount} type="number" required onChange={this.handleChange} />
        </p>
        <p>
          可{tradeType === 'buy' ? '买' : '卖'}：{maxAmount}
        </p>
        <input type="submit" value={tradeType === 'buy' ? '买入' : '卖出'} />
      </form>
    );
  }
}

export default styled(TradeForm) `
  input {
    color: var(${({ tradeType }) => (tradeType === 'buy' ? '--red' : '--green')});
  }
`;
