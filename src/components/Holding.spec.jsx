import React from 'react';
import { mount } from 'enzyme';

import Holding from './Holding';

describe('<Holding />', () => {
  let component = null;

  beforeAll(() => {
    component = mount(<table><tbody><Holding stockName="中国银行" stockAmount={1000} sellableAmount={500} floating={23.41} floatingRate="1.92%" /></tbody></table>);
  });

  it('renders stock name', () => {
    expect(component.find('td').at(0).text()).toBe('中国银行');
  });

  it('renders stock amount', () => {
    expect(component.find('td').at(1).text()).toBe('1000');
  });

  it('renders sellable amount', () => {
    expect(component.find('td').at(2).text()).toBe('500');
  });

  it('renders floating information', () => {
    expect(component.find('td').at(3).text()).toBe('23.41 (1.92%)');
  });
});
