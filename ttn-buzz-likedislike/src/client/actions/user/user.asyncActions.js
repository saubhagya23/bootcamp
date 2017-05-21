/**
 * Created by saubhagya on 11/5/17.
 */

import fetch from 'isomorphic-fetch'
import {Redirect} from 'react-router-dom';
import { apiUserFetchCallStarted, apiUserFetchCallSuccess, apiUserFetchCallFailed,
    apiSessionCallStarted, apiSessionCallSuccess, apiSessionCallFailed,
    /*apiUserLogoutCallStarted, apiUserLogoutCallSuccess , apiUserLogoutCallFailed*/ } from './user.actions'

import AuthService from './../../components/login/AuthService'

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
                AuthService().setUser(data);
                console.log('user in current session fetched in asyncAction>>>>>>>>>>>>>>>>>>>>>>>>>>>',data);
                dispatch(apiUserFetchCallSuccess(data));       //success

            })
            .catch(err => {
                console.log(err,'-----------err while fetching user')
                dispatch(apiUserFetchCallFailed(err));          //failure

            })
    }
};

export const asyncActionSession = () => {
    return (dispatch) => {
        dispatch(apiSessionCallStarted());
        fetch('http://localhost:3000/userSession',{
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
                //AuthService().setUser(data);
                console.log('user in current session in asyncAction======================',data);
                dispatch(apiSessionCallSuccess(data));       //success
            })
            .catch(err => {
                console.log(err,'-----------err while fetching user')
                dispatch(apiSessionCallFailed(err));          //failure
            })
    }
};

/*
export const asyncActionUserLogout = () => {
    return (dispatch) => {
        dispatch(apiUserLogoutCallStarted());
        fetch('http://localhost:3000/logout',{
            method: 'get',
            credentials:'include',
            /!*body:JSON.stringify({
             sessionCreated:sessionUser
             })*!/
        })
            .then(response => {
                console.log('response in async logout-----------',response);
                return response.json();
            })
            .then(data => {
                console.log('user in current session logged out in asyncAction>>>>>>>>>>>>>>>>>>>>>>>>>>>',data);
                dispatch(apiUserLogoutCallSuccess(data));       //success
            })
            .catch(err => {
                console.log(err,'-----------err while logging out user')
                dispatch(apiUserLogoutCallFailed(err));          //failure
            })
    }
};*/
