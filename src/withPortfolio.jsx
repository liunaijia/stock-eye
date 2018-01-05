import React, { Component } from 'react';
import { getPortfolio as getPortfolioFromApi } from './newoneApi';
import { runDuringTradeTime } from './jobs/job';

function withPortfolio(WrappedComponent) {
  return class extends Component {
    componentDidMount() {
      runDuringTradeTime({ interval: 10, runOnStartUp: true })(async () => {
        this.setState({ ...this.state, isLoading: true });
        const portfolio = await getPortfolioFromApi();
        this.setState({ ...portfolio, isLoading: false });
      });
    }

    render() {
      return <WrappedComponent {...this.props} portfolio={this.state} />;
    }
  };
}

export default withPortfolio;
