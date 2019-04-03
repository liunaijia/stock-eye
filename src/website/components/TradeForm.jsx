import React, { Component } from 'react';
import { string, number, func, oneOf } from 'prop-types';
import styled from 'styled-components';
import { Form, Button, InputNumber } from 'antd';

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
    price: this.props.price,
    amount: this.props.maxAmount,
  }

  handleSubmit = (event = new Event()) => {
    event.preventDefault();
    const { stockCode, onSubmit } = this.props;
    const { price, amount } = this.state;
    onSubmit({ stockCode, price, amount });
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form className={className} onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="股票">
          <span className="ant-form-text">{stockName}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="价格">
          <InputNumber name="price" defaultValue={this.state.price} step={0.01} required onChange={this.handleChange} />
        </FormItem>
        <FormItem {...formItemLayout} label="建议">
          <span className="ant-form-text">{price}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="数量">
          <InputNumber name="amount" defaultValue={this.state.amount} max={maxAmount} required onChange={this.handleChange} />
        </FormItem>
        <FormItem {...formItemLayout} label={tradeType === 'buy' ? '可买' : '可卖'}>
          <span className="ant-form-text">{maxAmount}</span>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">{tradeType === 'buy' ? '买入' : '卖出'}</Button>
        </FormItem>
      </Form>
    );
  }
}

export default styled(TradeForm)`
  input {
    color: var(${({ tradeType }) => (tradeType === 'buy' ? '--red' : '--green')});
  }
`;
