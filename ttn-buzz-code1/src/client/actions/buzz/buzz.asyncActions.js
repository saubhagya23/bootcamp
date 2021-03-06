/**
 * Created by saubhagya on 9/5/17.
 */

import fetch from 'isomorphic-fetch'
import {apiCallStarted, apiCallSuccess, apiCallFailed,
    apiFetchCallStarted, apiFetchCallSuccess, apiFetchCallFailed,
    apiCommentCallStarted, apiCommentCallSuccess, apiCommentCallFailed,
    apiLikeDislikeCallStarted, apiLikeDislikeCallSuccess, apiLikeDislikeCallFailed}from './buzz.actions'

export const asyncAction = (formData) => {
    console.log(formData,'----------in async call----')
    return (dispatch) => {              // this is store's dispatch method
        dispatch(apiCallStarted());         // call started
        fetch('http://localhost:3000/buzz',{
            method: 'post',
            credentials:'include',

            body: formData
        })  //when :name was provided , it started fetching data from DB.solved the error...

            .then(response => response.json())      //syntaxError: < undefined token....
            .then(data => {
                dispatch(apiCallSuccess(data)); 	// success
                //dispatch(apiFetchCallSuccess(data));
            })
            .catch(err => {
                dispatch(apiCallFailed(err));		// failure
            });
    }
};

export const asyncActionFetch = (offset) => {
    console.log('async action to get fetch-------',offset);
    return (dispatch) => {
        dispatch(apiFetchCallStarted());
        fetch(`http://localhost:3000/buzz?offset=${offset}`,{
            method: 'get',
            credentials:'include',
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
    return (dispatch) => {          // this is store's dispatch method
        dispatch(apiLikeDislikeCallStarted());          // call started
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
            })                   //syntaxError: < undefined token....
            .then(data => {
                console.log('----all like dislike data ',data);
                dispatch(apiLikeDislikeCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiLikeDislikeCallFailed(err));		// failure
            });
    }
};

export const asyncActionComment = (commentSend) => {
    console.log(commentSend,'----------in async call for comment----')
    return (dispatch) => {              // this is store's dispatch method
        dispatch(apiCommentCallStarted());          // call started
        fetch('http://localhost:3000/comment',{
            method: 'post',
            credentials:'include',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(commentSend)
        })  //when :name was provided , it started fetching data from DB.solved the error...

            .then(response => {
                console.log('response-----',response);
                return response.json();
            })      //syntaxError: < undefined token....
            .then(data => {
                console.log('----all comment data ',data);
                dispatch(apiCommentCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiCommentCallFailed(err));		// failure
            });
    }
};

