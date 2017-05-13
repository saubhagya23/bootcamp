/**
 * Created by saubhagya on 9/5/17.
 */

import { createStore , applyMiddleware} from 'redux'
import {middleware1} from '../middlewares/buzz/middlewaresBuzz.index'
import {reducer} from '../reducers/buzz/reducerBuzz.index'

const middleware = applyMiddleware(...middleware1);

export const store = createStore(reducer,middleware);