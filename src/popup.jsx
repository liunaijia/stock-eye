import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Portfolio from './components/Portfolio';
import TradeSuggestion from './components/TradeSuggestion';
import { GET_PORTFOLIO, GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import './popup.css';
import { sendMessage } from './chromeApi';

const fillForm = (formName = '', { stockCode, stockName, price, maxAmount } = {}) => {
  const form = document.querySelector(`form.${formName}`);
  form.querySelector('.stock').innerText = `${stockName} ${price}`;
  form.querySelector('.price').value = price;
  form.querySelector('.amount').value = maxAmount;
  form.querySelector('.maxAmount').innerText = maxAmount;
  form.querySelector('.code').value = stockCode;
};

class Popup extends Component {
  state = {
    availableCash: 0,
    holdings: [],
    tradeSuggestion: null,
  };

  async componentDidMount() {
    const portfolio = await sendMessage({ type: GET_PORTFOLIO });
    this.setState(portfolio);

    const tradeSuggesion = await sendMessage({ type: GET_TRADE_SUGGESTION });
    document.getElementById('debugWindow').innerText = JSON.stringify(tradeSuggesion);
    // if (tradeSuggesion) {
    fillForm('buy', tradeSuggesion.toBuy);
    fillForm('sell', tradeSuggesion.toSell);
    this.setState({ tradeSuggestion: tradeSuggesion });
    // }
  }

  handlePlaceOrder(order) {
    console.log(order);
  }

  render() {
    return (
      <div>
        <Portfolio availableCash={this.state.availableCash} holdings={this.state.holdings} />
        {this.state.tradeSuggestion &&
        <article>
          <header>
            交易建议
            GAP[{this.state.tradeSuggestion.value}]
            <time>{new Date(this.state.tradeSuggestion.timestamp).toLocaleTimeString()}</time>
          </header>
          <section>
            买入 {this.state.tradeSuggestion.toBuy.stockName}
            <TradeSuggestion
              tradeType="buy"
              price={this.state.tradeSuggestion.toBuy.price}
              maxAmount={this.state.tradeSuggestion.toBuy.maxAmount}
              quotes={this.state.tradeSuggestion.toBuy.quotes}
              onPlaceOrder={this.handlePlaceOrder}
            />
          </section>
          <section>
            卖出 {this.state.tradeSuggestion.toSell.stockName}
            <TradeSuggestion
              tradeType="sell"
              price={this.state.tradeSuggestion.toSell.price}
              maxAmount={this.state.tradeSuggestion.toSell.maxAmount}
              quotes={this.state.tradeSuggestion.toSell.quotes}
              onPlaceOrder={this.handlePlaceOrder}
            />
          </section>
        </article>
        }
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

      sendMessage({ type: PLACE_ORDER, payload }).then((response) => {
        document.querySelector('.message').innerText += JSON.stringify(response);
      });
    };
  });
});

