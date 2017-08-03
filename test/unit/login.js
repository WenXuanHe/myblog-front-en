import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '$components/login/index';

describe("A suite", function() {

  it("contains spec with an expectation", function() {
    expect(shallow(<Login />).is('.m-login')).toBe(true);
  });

  it("contains spec with an expectation", function() {
    expect(mount(<Login />).find('.u-userName').length).toBe(1);
    expect(mount(<Login />).find('.u-password').length).toBe(1);
    expect(mount(<Login />).find('.u-submit').length).toBe(1);
    expect(mount(<Login />).find('.form-control').length).toBe(3);
  });

});