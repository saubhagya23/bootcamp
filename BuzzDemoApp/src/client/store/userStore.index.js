/**
 * Created by saubhagya on 9/5/17.
 */

import { createStore , applyMiddleware} from 'redux'
import {middleware1} from '../middlewares/user/middlewaresUser.index'
import { sessionCreate } from '../reducers/user/reducerUser.index'

const middleware = applyMiddleware(...middleware1);

export const store = createStore(sessionCreate,middleware);