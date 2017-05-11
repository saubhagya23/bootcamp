import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './client/store/buzzStore.index'
//import './index.css';

/*ReactDOM.render(
  <App />,
  document.getElementById('root')
);*/

render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('app')

);
