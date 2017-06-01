/**
 * Created by saubhagya on 9/5/17.
 */

import { buzzCreate } from './reducers.buzz'
import { sessionCreate } from './../user/reducers.user'
import { complaintCreate } from './../complaint/reducers.complaint'
import { combineReducers } from 'redux'

export const reducer = combineReducers({
    buzzCreate,
    sessionCreate,
    complaintCreate,
});