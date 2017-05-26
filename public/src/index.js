//import './styles/common/common.scss';
// import React from 'react';
// import {render} from 'react-dom';
require('./styles/common/common.scss');
require('./global');
let React = require('react');
let render = require('react-dom').render;
let Provider = require('./redux/index.js');

render(
  Provider,
  document.getElementById('app')
);
