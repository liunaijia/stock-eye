import React, { Component } from 'react';
import { getPortfolio as getPortfolioFromApi } from './newoneApi';
import { runDuringTradeTime } from './jobs/job';

function withPortfolio(WrappedComponent) {
  return class extends Component {
    state = { portfolio: null }

    componentDidMount() {
      runDuringTradeTime({ interval: 10, runOnStartUp: true })(async () => {
        const portfolio = await getPortfolioFromApi();
        this.setState({ portfolio });
      });
    }

    render() {
      return <WrappedComponent {...this.props} portfolio={this.state.portfolio} />;
    }
  };
}

// function getTradeSuggesion() {

// }

// function placeOrder() {

// }

export default withPortfolio;
