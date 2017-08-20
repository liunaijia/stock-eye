import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Portfolio from './components/Portfolio';
import Quotes from './components/Quotes';
import { GET_PORTFOLIO } from './actions';
import './popup.css';

class Popup extends Component {
  constructor() {
    super();
    chrome.runtime.sendMessage({ type: GET_PORTFOLIO }, (response) => {
      this.setState(response);
    });
  }

  state = {
    availableCash: 0,
    holdings: [],
    quotes: {
      currentPrice: 4.01,
      buyingBids: [
        { price: 4.00, amount: 7458 },
        { price: 3.99, amount: 31904 },
        { price: 3.98, amount: 44368 },
        { price: 3.97, amount: 69427 },
        { price: 3.96, amount: 28521 }],
      sellingBids: [
        { price: 4.01, amount: 17006 },
        { price: 4.02, amount: 34706 },
        { price: 4.03, amount: 31231 },
        { price: 4.04, amount: 22060 },
        { price: 4.05, amount: 30422 },
      ],
    },
  };

  render() {
    return (
      <div>
        <Portfolio availableCash={this.state.availableCash} holdings={this.state.holdings} />
        <Quotes
          currentPrice={this.state.quotes.currentPrice}
          buyingBids={this.state.quotes.buyingBids}
          sellingBids={this.state.quotes.sellingBids}
        />
      </div>
    );
  }
}

const fillForm = (formName = '', { stockCode, stockName, price, maxAmount } = {}) => {
  const form = document.querySelector(`form.${formName}`);
  form.querySelector('.stock').innerText = `${stockName} ${price}`;
  form.querySelector('.price').value = price;
  form.querySelector('.amount').value = maxAmount;
  form.querySelector('.maxAmount').innerText = maxAmount;
  form.querySelector('.code').value = stockCode;
};

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


  chrome.runtime.sendMessage({ type: 'GET_SUGGESTION' }, (response) => {
    document.getElementById('debugWindow').innerText = JSON.stringify(response);
    if (response) {
      fillForm('buy', response.buy);
      fillForm('sell', response.sell);
    }
  });

  document.querySelectorAll('form').forEach((formNode) => {
    formNode.onsubmit = (e) => { // eslint-disable-line no-param-reassign
      e.preventDefault();
      const submitNode = formNode.querySelector('input[type="submit"]');
      submitNode.disabled = true;

      const payload = readForm(formNode);

      chrome.runtime.sendMessage({ type: 'PLACE_ORDER', payload }, (response) => {
        document.querySelector('.message').innerText += JSON.stringify(response);
      });
    };
  });
});

