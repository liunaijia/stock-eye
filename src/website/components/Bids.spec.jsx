import React from 'react';
import { mount } from 'enzyme';

import Bids from './Bids';

describe('<Bids />', () => {
  let component;

  beforeAll(() => {
    component = mount(<Bids
      type="buy"
      currentPrice={4}
      bids={[
        { price: 4, amount: 0 },
        { price: 4.01, amount: 0 },
        { price: 4.02, amount: 0 },
        { price: 4.03, amount: 0 },
        { price: 4.04, amount: 0 },
      ]}
    />);
  });

  it('renders buying bids in ascending', () => {
    component.setProps({ type: 'buy' });
    const items = component.find('li');

    expect(items.at(0).text()).toContain('4.00');
    expect(items.at(1).text()).toContain('4.01');
    expect(items.at(2).text()).toContain('4.02');
    expect(items.at(3).text()).toContain('4.03');
    expect(items.at(4).text()).toContain('4.04');
  });

  it('renders selling bids in descending', () => {
    component.setProps({ type: 'sell' });
    const items = component.find('li');

    expect(items.at(0).text()).toContain('4.04');
    expect(items.at(1).text()).toContain('4.03');
    expect(items.at(2).text()).toContain('4.02');
    expect(items.at(3).text()).toContain('4.01');
    expect(items.at(4).text()).toContain('4.00');
  });
});
