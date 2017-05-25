/**
 * Created by saubhagya on 9/5/17.
 */

import { buzzCreate } from './reducers.buzz'
import { sessionCreate } from './../user/reducers.user'
import { newSession } from './../user/reducers.user'
import { combineReducers } from 'redux'

export const reducer = combineReducers({
    buzzCreate,
    sessionCreate,
    newSession
});