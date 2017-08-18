import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Holdings from './components/Holdings';

class Popup extends Component {
  constructor() {
    super();

    chrome.runtime.sendMessage({ type: 'GET_HOLDINGS' }, (response) => {
      this.setState(response);
    });
  }

  state = {
    balance: 0,
    stocks: [],
  };

  render() {
    return (
      <div>
        <Holdings stocks={this.state.stocks} />
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

