import './styles/common/common.scss';
import * as React from 'react';
import {render} from 'react-dom';
import './global'
import Provider from './redux/index'

render(
  Provider,
  document.getElementById('app')
);


