/**
 * Created by saubhagya on 28/5/17.
 */

import fetch from 'isomorphic-fetch'
import { apiCreateComplaintStarted, apiCreateComplaintSuccess, apiCreateComplaintFailed,
    apiFetchComplaintStarted, apiFetchComplaintSuccess, apiFetchComplaintFailed,
    apiComplaintStatusStarted, apiComplaintStatusSuccess, apiComplaintStatusFailed,
    apiResolvedComplaintStarted, apiResolvedComplaintSuccess ,apiResolvedComplaintFailed}from './complaint.actions'

export const asyncActionCreateComplaint = (formData) => {
    console.log(formData,'----------in async call complaint----')
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
    console.log('async action to fetch complaint-------',offset);
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
                console.log('data complaint fetch>>>>>>>>>>>>>>>>>>>>>>>>>>>',data);
                dispatch(apiFetchComplaintSuccess(data));       //success
            })
            .catch(err => {
                dispatch(apiFetchComplaintFailed(err));          //failure
            })
    }
};

export const asyncActionComplaintStatus = (CStatus) => {
    console.log('async action to complaint status-------',CStatus);
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
                console.log('data complaint closed>>>>>>>>>>>>>>>>>>>>>>>>>>>',data);
                dispatch(apiComplaintStatusSuccess(data));       //success
            })
            .catch(err => {
                dispatch(apiComplaintStatusFailed(err));          //failure
            })
    }
};

export const asyncActionResolvedComplaint = (offset) => {
    console.log('async action to fetch resolved complaint-------',offset);
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