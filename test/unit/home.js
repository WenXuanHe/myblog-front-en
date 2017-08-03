import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from '$components/Home';
import Provider from '$redux/index';

let wrapper;

beforeEach(() => {
    wrapper = mount(Provider);
})
describe("A suite", function () {

    it("contains spec with g-home", function () {
        // console.log("----------", wrapper.html(), "----------");
        expect(wrapper.find('.g-home').exists()).toBe(true);
    });

    it("contains spec find ", function () {
        expect(wrapper.find('.m-header').length).toBe(1);
        expect(wrapper.find('.m-list').length).toBe(1);
    });
    
});

describe('click on link', () => {
      beforeEach(() => {
         wrapper.find('Link').findWhere(n => n.prop('to') === '/writer/writer').simulate('click');
        //  wrapper.find('.m-header a').simulate('click');
      });

      it('render Profile writer', () => {
         
         console.log('current html', wrapper.html());
         expect(wrapper.find('.m-work').length).toBe(1);
      });
   });