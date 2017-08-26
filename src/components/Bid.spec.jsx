import React from 'react';
import { mount } from 'enzyme';

import Bid from './Bid';

describe('<Bid />', () => {
  let component =
  beforeAll(() => {
    component = mount(<Bid index={0} type="buy" price={4} amount={532100} currentPrice={4.01} />);
  });

  it('renders bid type', () => {
    const text = component.find('span').first().text();

    expect(text).toBe('买1');
  });

  it('renders price', () => {
    const text = component.find('span').at(1).text();

    expect(text).toBe('4.00');
  });

  it('renders lot', () => {
    const text = component.find('span').at(2).text();

    expect(text).toBe('5321');
  });

  describe('data-vs-current-price', () => {
    it('is lower than current price', () => {
      component.setProps({ price: 3.99, currentPrice: 4 });

      const result = component.find('li').prop('data-vs-current-price');

      expect(result).toBe('lower');
    });

    it('is higher than current price', () => {
      component.setProps({ price: 3.99, currentPrice: 3.98 });

      const result = component.find('li').prop('data-vs-current-price');

      expect(result).toBe('higher');
    });

    it('equals to current price', () => {
      component.setProps({ price: 3.99, currentPrice: 3.99 });

      const result = component.find('li').prop('data-vs-current-price');

      expect(result).toBe('equal');
    });
  });
});
