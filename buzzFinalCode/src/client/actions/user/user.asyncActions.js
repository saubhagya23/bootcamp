/**
 * Created by saubhagya on 11/5/17.
 */

import fetch from 'isomorphic-fetch'
import { apiUserFetchCallStarted, apiUserFetchCallSuccess, apiUserFetchCallFailed } from './user.actions'

//import AuthService from './../../components/login/AuthService'

export const asyncActionUserSession = () => {
    return (dispatch) => {
        dispatch(apiUserFetchCallStarted());
        fetch('http://localhost:3000/user',{
            method: 'get',
            credentials:'include',

        })
            .then(response => {
                return response.json();
                    })
            .then(data => {
                //AuthService().setUser(data);
                dispatch(apiUserFetchCallSuccess(data));       //success

            })
            .catch(err => {
                dispatch(apiUserFetchCallFailed(err));          //failure

            })
    }
};


