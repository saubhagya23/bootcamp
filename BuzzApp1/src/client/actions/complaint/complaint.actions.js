/**
 * Created by saubhagya on 28/5/17.
 */

import { CREATE_COMPLAINT_STARTED, CREATE_COMPLAINT_SUCCESS, CREATE_COMPLAINT_FAILED,
    FETCH_COMPLAINT_STARTED, FETCH_COMPLAINT_SUCCESS, FETCH_COMPLAINT_FAILED,
    COMPLAINT_STATUS_STARTED, COMPLAINT_STATUS_SUCCESS, COMPLAINT_STATUS_FAILED,
    RESOLVED_COMPLAINT_STARTED, RESOLVED_COMPLAINT_SUCCESS, RESOLVED_COMPLAINT_FAILED} from '../../config/config.constantsForStore'

export function apiCreateComplaintStarted(){
    return {type:CREATE_COMPLAINT_STARTED}
}

export function apiCreateComplaintSuccess(val){
    return {type:CREATE_COMPLAINT_SUCCESS,val}
}

export function apiCreateComplaintFailed(err){
    return {type:CREATE_COMPLAINT_FAILED,err}
}

export function apiFetchComplaintStarted(){
    return {type:FETCH_COMPLAINT_STARTED}
}

export function apiFetchComplaintSuccess(val){
    return {type:FETCH_COMPLAINT_SUCCESS,val}
}

export function apiFetchComplaintFailed(err){
    return {type:FETCH_COMPLAINT_FAILED,err}
}

export function apiComplaintStatusStarted(){
    return {type:COMPLAINT_STATUS_STARTED}
}

export function apiComplaintStatusSuccess(val){
    return {type:COMPLAINT_STATUS_SUCCESS,val}
}

export function apiComplaintStatusFailed(err){
    return {type:COMPLAINT_STATUS_FAILED,err}
}

export function apiResolvedComplaintStarted(){
    return {type:RESOLVED_COMPLAINT_STARTED}
}

export function apiResolvedComplaintSuccess(val){
    return {type:RESOLVED_COMPLAINT_SUCCESS,val}
}

export function apiResolvedComplaintFailed(err){
    return {type:RESOLVED_COMPLAINT_FAILED,err}
}