/**
 * Created by saubhagya on 25/4/17.
 */

import { createStore , applyMiddleware} from 'redux'
import {middleware1} from './../middlewares/index'
import {userFetch} from './../reducers/index'

const middleware = applyMiddleware(...middleware1);

export const store = createStore(userFetch,middleware);

