import React, { Component } from 'react';
import { string, number, func, oneOf } from 'prop-types';
import styled from 'styled-components';
import { Form } from 'antd';

const FormItem = Form.Item;

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
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      className, tradeType, stockName, price, maxAmount,
    } = this.props;
    return (
      <Form className={className} onSubmit={this.handleSubmit}>
        <FormItem>
          股票：<input name="stockName" value={stockName} readOnly />
          <input name="stockCode" value={this.state.stockCode} type="hidden" />
        </FormItem>
        <FormItem>
          价格：<input name="price" value={this.state.price} type="number" required onChange={this.handleChange} />
        </FormItem>
        <FormItem>
          建议：{price}
        </FormItem>
        <FormItem>
          数量：<input name="amount" value={this.state.amount} type="number" required onChange={this.handleChange} />
        </FormItem>
        <FormItem>
          可{tradeType === 'buy' ? '买' : '卖'}：{maxAmount}
        </FormItem>
        <input type="submit" value={tradeType === 'buy' ? '买入' : '卖出'} />
      </Form>
    );
  }
}

export default styled(TradeForm)`
  input {
    color: var(${({ tradeType }) => (tradeType === 'buy' ? '--red' : '--green')});
  }
`;
