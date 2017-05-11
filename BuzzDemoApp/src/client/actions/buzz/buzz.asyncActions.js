/**
 * Created by saubhagya on 9/5/17.
 */

import fetch from 'isomorphic-fetch'
import {apiCallStarted, apiCallSuccess, apiCallFailed,
    apiFetchCallStarted, apiFetchCallSuccess, apiFetchCallFailed }from './buzz.actions'

export const asyncAction = (newBuzz) => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(apiCallStarted()); // call started
        fetch('http://localhost:3000/buzz',{
            method: 'post',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                buzzCreated:newBuzz
            })
        })  //when :name was provided , it started fetching data from DB.solved the error...

            .then(response => response.json())      //syntaxError: < undefined token....
            .then(data => {
                console.log('----all post data ',data);
                dispatch(apiCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiCallFailed(err));		// failure
            });
    }
};

export const asyncActionFetch = () => {
    console.log('async action to get fetch-------')
    return (dispatch) => {
        dispatch(apiFetchCallStarted());
        fetch('http://localhost:3000/buzz',{
            method: 'get',

            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('data buzz fetch>>>>>>>>>>>>>>>>>>>>>>>>>>>',data);
                dispatch(apiFetchCallSuccess(data));       //success
            })
            .catch(err => {
                dispatch(apiFetchCallFailed(err));          //failure
            })
    }
};

