window['_INITIAL_STATE_'] = { "writer": { "workList": [{ "id": 12, "title": "gggggg", "userID": "8" }, { "id": 11, "title": "ggggg", "userID": "8" }, { "id": 10, "title": "gggg", "userID": "8" }, { "id": 9, "title": "ggg", "userID": "8" }, { "id": 8, "title": "gg", "userID": "8" }, { "id": 7, "title": "yy", "userID": "8" }, { "id": 6, "title": "ll", "userID": "8" }, { "id": 5, "title": "sd", "userID": "8" }, { "id": 4, "title": "js", "userID": "8" }, { "id": 3, "title": "js", "userID": "8" }, { "id": 2, "title": "js", "userID": "8" }, { "id": 1, "title": "haha", "userID": "8" }], "articleLists": {}, "currentArticleID": 0, "currentWorkID": 0 } };
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from '$components/Home';
import Provider from '$redux/index';

let wrapper, wrapper_router;
export const mountWithRouter = (ReactNode, routerProps = {}, context = {}) => {
    return mount(
        <MemoryRouter {...routerProps}>
            {ReactNode}
        </MemoryRouter>
        , context)
}

beforeEach(() => {
    wrapper = mount(Provider);

    // wrapper_router = mountWithRouter(<Header {...headerProps} />, {
    //     initialEntries: ['/intro']
    // });

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

// describe('click on link', () => {
//     beforeEach(() => {
//         wrapper.find('Link').findWhere(n => n.prop('to') === '/writer/writer').simulate('click');
//         //  wrapper.find('.m-header a').simulate('click');
//     });

//     it('render Profile writer', () => {

//         console.log('current html', wrapper.html());
//         expect(wrapper.find('.m-work').length).toBe(1);
//     });
// });