/**
 * Created by saubhagya on 9/5/17.
 */

import { CREATE_BUZZ_STARTED, CREATE_BUZZ_SUCCESS, CREATE_BUZZ_FAILED ,
    FETCH_BUZZ_STARTED , FETCH_BUZZ_SUCCESS, FETCH_BUZZ_FAILED } from '../../config/config.constantsForStore'

export function apiCallStarted(){
    return {type:CREATE_BUZZ_STARTED}
}

export function apiCallSuccess(val){
    return {type:CREATE_BUZZ_SUCCESS,val}
}

export function apiCallFailed(err){
    return {type:CREATE_BUZZ_FAILED,err}
}

export function apiFetchCallStarted(){
    return {type:FETCH_BUZZ_STARTED}
}

export function apiFetchCallSuccess(val){
    return {type:FETCH_BUZZ_SUCCESS,val}
}

export function apiFetchCallFailed(err){
    return {type:FETCH_BUZZ_FAILED,err}
}

