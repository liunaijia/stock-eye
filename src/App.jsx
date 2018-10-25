import React, { Component } from 'react';
import { string } from 'prop-types';
import { Layout } from 'antd';
import styled from 'styled-components';
import withTradeSuggesion from './withTradeSuggesion';

import withNotification from './withNotification';

import ErrorBoundary from './components/ErrorBoundary';
import { Hq, LiteHq } from './components/hq';
import { sendNotification } from './notification';
import './App.css';

const { Content, Sider } = Layout;

class App extends Component {
  static propTypes = {
    className: string,
  };

  static defaultProps = {
    className: null,
  }

  componentDidMount() {
    sendNotification({ title: 'started' });
  }

  render() {
    const { className } = this.props;
    return (
      <ErrorBoundary>
        <Layout className={className}>
          <Content>
            <Hq />
          </Content>
          <Sider className="sider" width="auto">
            <LiteHq />
          </Sider>
        </Layout>
      </ErrorBoundary>
    );
  }
}

export default styled(withTradeSuggesion()(withNotification()(App)))`
  .sider {
    background: #1e1e1d;
  }
`;
