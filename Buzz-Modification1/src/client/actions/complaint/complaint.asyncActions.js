/**
 * Created by saubhagya on 28/5/17.
 */

import fetch from 'isomorphic-fetch'
import { apiCreateComplaintStarted, apiCreateComplaintSuccess, apiCreateComplaintFailed,
    apiFetchComplaintStarted, apiFetchComplaintSuccess, apiFetchComplaintFailed,
    apiComplaintStatusStarted, apiComplaintStatusSuccess, apiComplaintStatusFailed,
    apiResolvedComplaintStarted, apiResolvedComplaintSuccess ,apiResolvedComplaintFailed,
    apiDeleteComplaintStarted, apiDeleteComplaintSuccess, apiDeleteComplaintFailed}from './complaint.actions'

export const asyncActionCreateComplaint = (formData) => {

    return (dispatch) => {              // this is store's dispatch method
        dispatch(apiCreateComplaintStarted());         // call started
        fetch('http://localhost:3000/createComplaint',{
            method: 'post',
            credentials:'include',

            body: formData
        })

            .then(response => response.json())
            .then(data => {
                dispatch(apiCreateComplaintSuccess(data)); 	// success

            })
            .catch(err => {
                dispatch(apiCreateComplaintFailed(err));		// failure
            });
    }
};

export const asyncActionFetchComplaint = (offset) => {

    return (dispatch) => {
        dispatch(apiFetchComplaintStarted());
        fetch(`http://localhost:3000/createComplaint?offset=${offset}`,{
            method: 'get',
            credentials:'include',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(apiFetchComplaintSuccess(data));       //success
            })
            .catch(err => {
                dispatch(apiFetchComplaintFailed(err));          //failure
            })
    }
};

export const asyncActionComplaintStatus = (CStatus) => {

    return (dispatch) => {
        dispatch(apiComplaintStatusStarted());
        fetch('http://localhost:3000/complaintStatus',{
            method: 'post',
            credentials:'include',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(CStatus)
        })
            .then(response => response.json())
            .then(data => {
                dispatch(apiComplaintStatusSuccess(data));       //success
            })
            .catch(err => {
                dispatch(apiComplaintStatusFailed(err));          //failure
            })
    }
};

export const asyncActionResolvedComplaint = (offset) => {

    return (dispatch) => {
        dispatch(apiResolvedComplaintStarted());
        fetch(`http://localhost:3000/resolveComplaint?offset=${offset}`,{
            method:'get' ,
            credentials:'include',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(apiResolvedComplaintSuccess(data));
            })
            .catch(err => {
                dispatch(apiResolvedComplaintFailed(err));
            })
    }
}

export const asyncActionDeleteComplaint = (deleteData) => {

    return (dispatch) => {              // this is store's dispatch method
        dispatch(apiDeleteComplaintStarted());         // call started
        fetch('http://localhost:3000/deleteComplaint',{
            method: 'post',
            credentials:'include',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },

            body: JSON.stringify(deleteData)
        })

            .then(response => response.json())
            .then(data => {
                dispatch(apiDeleteComplaintSuccess(data)); 	// success

            })
            .catch(err => {
                dispatch(apiDeleteComplaintFailed(err));		// failure
            });
    }
};