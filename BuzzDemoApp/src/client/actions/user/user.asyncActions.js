/**
 * Created by saubhagya on 11/5/17.
 */

import fetch from 'isomorphic-fetch'

import { apiUserFetchCallStarted, apiUserFetchCallSuccess, apiUserFetchCallFailed } from './user.actions'

export const asyncActionUserSession = () => {
    return (dispatch) => {
        dispatch(apiUserFetchCallStarted());
        fetch('http://localhost:3000/user',{
            method: 'get',
            credentials:'include',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            /*body:JSON.stringify({
             sessionCreated:sessionUser
             })*/
        })
            .then(response => response.json())
            .then(data => {
                console.log('user in current session fetched>>>>>>>>>>>>>>>>>>>>>>>>>>>',data);
                dispatch(apiUserFetchCallSuccess(data));       //success
            })
            .catch(err => {
                dispatch(apiUserFetchCallFailed(err));          //failure
            })
    }
};