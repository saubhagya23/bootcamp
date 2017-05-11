/**
 * Created by saubhagya on 9/5/17.
 */

import { buzzCreate } from './reducers.buzz'
import { buzzFetch } from './reducers.buzz'
import { combineReducers } from 'redux'

export const reducer = combineReducers({
    buzzCreate,
    buzzFetch
});