
import React,{ Component} from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/components/App'
import {store} from './src/store'

render(
    <Provider store={store}>
        <App/>
    </Provider>,
        document.getElementById('app1')
);
