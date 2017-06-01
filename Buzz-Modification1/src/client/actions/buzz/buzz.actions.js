/**
 * Created by saubhagya on 9/5/17.
 */

import { CREATE_BUZZ_STARTED, CREATE_BUZZ_SUCCESS, CREATE_BUZZ_FAILED ,
    FETCH_BUZZ_STARTED , FETCH_BUZZ_SUCCESS, FETCH_BUZZ_FAILED ,
    FETCH_COMMENT_STARTED, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILED,
    DELETE_BUZZ_STARTED, DELETE_BUZZ_SUCCESS, DELETE_BUZZ_FAILED,
    FETCH_LIKE_DISLIKE_STARTED, FETCH_LIKE_DISLIKE_SUCCESS, FETCH_LIKE_DISLIKE_FAILED} from '../../config/config.constantsForStore'

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

export function apiCommentCallStarted(){
    return {type:FETCH_COMMENT_STARTED}
}

export function apiCommentCallSuccess(val){
    return {type:FETCH_COMMENT_SUCCESS,val}
}

export function apiCommentCallFailed(err){
    return {type:FETCH_COMMENT_FAILED,err}
}

export function apiLikeDislikeCallStarted(){
    return {type:FETCH_LIKE_DISLIKE_STARTED}
}

export function apiLikeDislikeCallSuccess(val){
    return {type:FETCH_LIKE_DISLIKE_SUCCESS,val}
}

export function apiLikeDislikeCallFailed(err){
    return {type:FETCH_LIKE_DISLIKE_FAILED,err}
}

export function apiDeleteCallStarted(){
    return {type:DELETE_BUZZ_STARTED}
}

export function apiDeleteCallSuccess(val){
    return {type:DELETE_BUZZ_SUCCESS,val}
}

export function apiDeleteCallFailed(err){
    return {type:DELETE_BUZZ_FAILED,err}
}

