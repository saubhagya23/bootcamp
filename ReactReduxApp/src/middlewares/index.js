/**
 * Created by saubhagya on 25/4/17.
 */

import {UserMiddleware} from './userFetch'

import thunkMiddleware from 'redux-thunk'

export const middleware1 = [
    UserMiddleware,
    thunkMiddleware
];