/**
 * Created by saubhagya on 9/5/17.
 */

import fetch from 'isomorphic-fetch'
import {apiCallStarted, apiCallSuccess, apiCallFailed,
    apiFetchCallStarted, apiFetchCallSuccess, apiFetchCallFailed,
    apiLikeDislikeCallStarted, apiLikeDislikeCallSuccess, apiLikeDislikeCallFailed}from './buzz.actions'

export const asyncAction = (formData) => {
    console.log(formData,'----------in async call----')
    return (dispatch) => { // this is store's dispatch method
        dispatch(apiCallStarted()); // call started
        fetch('http://localhost:3000/buzz',{
            method: 'post',
            credentials:'include',
         /*   headers : {
                "Content-Type": false,
                "Accept": "application/json",
            },*/
            body: formData
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

export const asyncActionLikeDislike = (buzzSend) => {
    console.log(buzzSend,'----------in async call for like dislike----')
    return (dispatch) => { // this is store's dispatch method
        dispatch(apiLikeDislikeCallStarted()); // call started
        fetch('http://localhost:3000/likeDislike',{
            method: 'post',
            credentials:'include',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(buzzSend)
        })  //when :name was provided , it started fetching data from DB.solved the error...

            .then(response => {
                console.log('response-----',response);
                return response.json();
            })      //syntaxError: < undefined token....
            .then(data => {
                console.log('----all like dislike data ',data);
                dispatch(apiLikeDislikeCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiLikeDislikeCallFailed(err));		// failure
            });
    }
};

