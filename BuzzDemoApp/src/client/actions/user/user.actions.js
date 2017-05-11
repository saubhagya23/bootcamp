/**
 * Created by saubhagya on 11/5/17.
 */

import { FETCH_USER_STARTED, FETCH_USER_SUCCESS, FETCH_USER_FAILED } from '../../config/config.constantsForStore'

export function apiUserFetchCallStarted(){
    return {type:FETCH_USER_STARTED}
}

export function apiUserFetchCallSuccess(val){
    return {type:FETCH_USER_SUCCESS,val}
}

export function apiUserFetchCallFailed(err){
    return {type:FETCH_USER_FAILED,err}
}