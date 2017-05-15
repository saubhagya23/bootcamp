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
            /*body:JSON.stringify({
             sessionCreated:sessionUser
             })*/
        })
            .then(response => {
                console.log('response in async-----------',response);
                return response.json();
                    })
            .then(data => {
                console.log('user in current session fetched in asyncAction>>>>>>>>>>>>>>>>>>>>>>>>>>>',data);
                dispatch(apiUserFetchCallSuccess(data));       //success
            })
            .catch(err => {
                console.log(err,'-----------err while fetching user')
                dispatch(apiUserFetchCallFailed(err));          //failure
            })
    }
};