/**
 * Created by saubhagya on 25/4/17.
 */

import {FETCH_USER_STARTED, FETCH_USER_SUCCESS, FETCH_USER_FAILED,
    DELETE_USER_STARTED, DELETE_USER_SUCCESS, DELETE_USER_FAILED,
    EDIT_USER_STARTED, EDIT_USER_SUCCESS, EDIT_USER_FAILED} from './../config/config.constants'

export function apiCallStarted(){
    return {type:FETCH_USER_STARTED}
}

export function apiCallSuccess(val){
    return {type:FETCH_USER_SUCCESS,val}
}

export function apiCallFailed(err){
    return {type:FETCH_USER_FAILED,err}
}

export function apiCallUserDelStarted(){
    return {type:DELETE_USER_STARTED}
}

export function apiCallUserDelSuccess(val){
    return {type:DELETE_USER_SUCCESS,val}
}

export function apiCallUserDelFailed(err){
    return {type:DELETE_USER_FAILED,err}
}

export function apiCallUserEditStarted(){
    return {type:EDIT_USER_STARTED}
}

export function apiCallUserEditSuccess(val){
    return {type:EDIT_USER_SUCCESS,val}
}

export function apiCallUserEditFailed(err){
    return {type:EDIT_USER_FAILED,err}
}