import React, { Component } from 'react';
import { createResource } from 'react-cache';
import { cache } from './cache';

const resource = createResource(async () => {
  const response = await fetch('http://worldclockapi.com/api/json/utc/now');
  return response.json();
});

// 三秒过期的缓存key
//

class Now extends Component {
  state = {
    cacheKey: undefined,
  }

  componentDidMount() {
    // request time every 3 seconds
    console.log('componentDidMount');
    setTimeout(() => this.setState({ cacheKey: new Date().valueOf() }), 3000);
  }

  componentDidUpdate() {
    // request time every 3 seconds
    console.log('componentDidUpdate');
    setTimeout(() => this.setState({ cacheKey: new Date().valueOf() }), 3000);
  }


  componentWillUnmount() {
  }

  render() {
    // const cacheKey = Math.floor(new Date().valueOf() / 1000 / 3) * 3 * 1000;
    return (
      <h1>{resource.read(cache, this.state.cacheKey).currentFileTime}</h1>
    );
  }
}


export default Now;
