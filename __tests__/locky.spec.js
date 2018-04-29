import React from 'react';
import Locky from '../src';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Locky', () => {
  it('smoke', () => {
    const wrapper = mount(
      <Locky>
        <div>123</div>
      </Locky>
    );
    expect(wrapper.html()).toBe('<div><div>123</div></div>');
  });

  it('component prop', () => {
    const wrapper = mount(
      <Locky component={<span />.type}>
        <div>123</div>
      </Locky>
    );
    expect(wrapper.html()).toBe('<span><div>123</div></span>');
  });
 // Oh, it is not easy to test this :(
});