import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Portfolio from './components/Portfolio';
import TradeSuggestion from './components/TradeSuggestion';
import { GET_PORTFOLIO, GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import { sendMessage } from './chromeApi';
import './popup.css';

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
    this.setState({ tradeSuggestion: tradeSuggesion });
  }

   handlePlaceOrder =async (order) => {
     const payload = { type: order.tradeType,
       stockCode: order.stockCode,
       price: order.price,
       amount: order.amount };
     const response = await sendMessage({ type: PLACE_ORDER, payload });
     this.setState({ operationResults: response });
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
             <p>{this.state.operationResults}</p>
           </section>
           <section>
            买入 {this.state.tradeSuggestion.toBuy.stockName}
             <TradeSuggestion
               tradeType="buy"
               stockCode={this.state.tradeSuggestion.toBuy.stockCode}
               stockName={this.state.tradeSuggestion.toBuy.stockName}
               price={this.state.tradeSuggestion.toBuy.price}
               maxAmount={this.state.tradeSuggestion.toBuy.maxAmount}
               onPlaceOrder={this.handlePlaceOrder}
             />
           </section>
           <section>
            卖出 {this.state.tradeSuggestion.toSell.stockName}
             <TradeSuggestion
               tradeType="sell"
               stockCode={this.state.tradeSuggestion.toSell.stockCode}
               stockName={this.state.tradeSuggestion.toSell.stockName}
               price={this.state.tradeSuggestion.toSell.price}
               maxAmount={this.state.tradeSuggestion.toSell.maxAmount}
               onPlaceOrder={this.handlePlaceOrder}
             />
           </section>
         </article>
         }
       </div>
     );
   }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Popup />, document.getElementById('root'));
});

