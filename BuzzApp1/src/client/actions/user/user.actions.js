/**
 * Created by saubhagya on 11/5/17.
 */

import { FETCH_USER_STARTED, FETCH_USER_SUCCESS, FETCH_USER_FAILED ,
    /*FETCH_USER_LOGOUT_STARTED, FETCH_USER_LOGOUT_SUCCESS, FETCH_USER_LOGOUT_FAILED*/} from '../../config/config.constantsForStore'

export function apiUserFetchCallStarted(){
    return {type:FETCH_USER_STARTED}
}

export function apiUserFetchCallSuccess(val){
    return {type:FETCH_USER_SUCCESS,val}
}

export function apiUserFetchCallFailed(err){
    return {type:FETCH_USER_FAILED,err}
}

export function apiSessionCallStarted(){
    return {type:FETCH_USER_SESSION_STARTED}
}

export function apiSessionCallSuccess(val){
    return {type:FETCH_USER_SESSION_SUCCESS,val}
}

export function apiSessionCallFailed(err){
    return {type:FETCH_USER_SESSION_FAILED,err}
}

/*
export function apiUserLogoutCallStarted(){
    return {type:FETCH_USER_LOGOUT_STARTED}
}

export function apiUserLogoutCallSuccess(val){
    return {type:FETCH_USER_LOGOUT_SUCCESS,val}
}

export function apiUserLogoutCallFailed(err){
    return {type:FETCH_USER_LOGOUT_FAILED,err}
}*/
