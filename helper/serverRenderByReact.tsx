import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server'
import {Provider} from 'react-redux'
import Home from '$views/Home'
import getStore from '../public/src/redux/store/index'
import StaticRouter from 'react-router'

export default function(initData){
    let store = getStore(initData);
    let html = ReactDOMServer.renderToString(
        <Provider store={store}>
        <StaticRouter>
            <Home />
        </StaticRouter>
        </Provider>
    );
    return html;
}
