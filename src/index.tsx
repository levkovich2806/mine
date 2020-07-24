import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Game from './Game';
import store from './store/index';

render(
  <Provider store={store}>
    <Game/>
  </Provider>,
  document.getElementById('root'),
);