import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import Home from '$views/Home'
import getStore from '../public/src/redux/store/index'
import {StaticRouter} from 'react-router-dom'

export default function(url, initData){
    let store = getStore(initData);
    let html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={url}>
                <Home />
            </StaticRouter>
        </Provider>
        
    );
    return html;
}
