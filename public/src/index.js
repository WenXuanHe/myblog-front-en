import './styles/common/common.scss';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '$redux/store';
import routes from '$routes';

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);
