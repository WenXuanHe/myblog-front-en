import './styles/common/common.scss';

import React from 'react';
import {render} from 'react-dom';
import route from './routes';

render(
  route,
  document.getElementById('app')
);
