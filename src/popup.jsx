import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Portfolio from './components/Portfolio';
import Quotes from './components/Quotes';
import { GET_PORTFOLIO, GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import './popup.css';

const fillForm = (formName = '', { stockCode, stockName, price, maxAmount } = {}) => {
  const form = document.querySelector(`form.${formName}`);
  form.querySelector('.stock').innerText = `${stockName} ${price}`;
  form.querySelector('.price').value = price;
  form.querySelector('.amount').value = maxAmount;
  form.querySelector('.maxAmount').innerText = maxAmount;
  form.querySelector('.code').value = stockCode;
};

class Popup extends Component {
  constructor() {
    super();
    chrome.runtime.sendMessage({ type: GET_PORTFOLIO }, (response) => {
      this.setState(response);
    });
    chrome.runtime.sendMessage({ type: GET_TRADE_SUGGESTION }, (response) => {
      document.getElementById('debugWindow').innerText = JSON.stringify(response);
      if (response) {
        fillForm('buy', response.toBuy);
        fillForm('sell', response.toSell);
        this.setState({ ...this.setState, tradeSuggestion: response });
      }
    });
  }

  state = {
    availableCash: 0,
    holdings: [],
    tradeSuggestion: {
      gap: 0,
      toBuy: {
        // quotes: {
        //   current: 0,
        //   buyingBids: [],
        //   sellingBids: [],
        // },
      },
      toSell: {
        // quotes: {
        //   current: 0,
        //   buyingBids: [],
        //   sellingBids: [],
        // },
      },
    },
  };

  render() {
    return (
      <div>
        <Portfolio availableCash={this.state.availableCash} holdings={this.state.holdings} />
        {/* 
        <Quotes
          currentPrice={this.state.tradeSuggestion.toBuy.quotes.currentPrice}
          buyingBids={this.state.tradeSuggestion.toBuy.quotes.buyingBids}
          sellingBids={this.state.tradeSuggestion.toBuy.quotes.sellingBids}
        />
        <Quotes
          currentPrice={this.state.tradeSuggestion.toSell.quotes.currentPrice}
          buyingBids={this.state.tradeSuggestion.toSell.quotes.buyingBids}
          sellingBids={this.state.tradeSuggestion.toSell.quotes.sellingBids}
        /> */}
      </div>
    );
  }
}

const readForm = (form = new HTMLFormElement()) => (
  {
    type: form.querySelector('.type').value,
    stockCode: form.querySelector('.code').value,
    price: parseFloat(form.querySelector('.price').value),
    amount: parseFloat(form.querySelector('.amount').value),
  }
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Popup />, document.getElementById('root'));

  document.querySelectorAll('form').forEach((formNode) => {
    formNode.onsubmit = (e) => { // eslint-disable-line no-param-reassign
      e.preventDefault();
      const submitNode = formNode.querySelector('input[type="submit"]');
      submitNode.disabled = true;

      const payload = readForm(formNode);

      chrome.runtime.sendMessage({ type: PLACE_ORDER, payload }, (response) => {
        document.querySelector('.message').innerText += JSON.stringify(response);
      });
    };
  });
});

