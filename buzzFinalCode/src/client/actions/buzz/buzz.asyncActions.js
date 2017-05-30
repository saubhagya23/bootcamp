/**
 * Created by saubhagya on 9/5/17.
 */

import fetch from 'isomorphic-fetch'
import {apiCallStarted, apiCallSuccess, apiCallFailed,
    apiFetchCallStarted, apiFetchCallSuccess, apiFetchCallFailed,
    apiCommentCallStarted, apiCommentCallSuccess, apiCommentCallFailed,
    apiDeleteCallStarted, apiDeleteCallSuccess, apiDeleteCallFailed,
    apiLikeDislikeCallStarted, apiLikeDislikeCallSuccess, apiLikeDislikeCallFailed}from './buzz.actions'

export const asyncAction = (formData) => {

    return (dispatch) => {              // this is store's dispatch method
        dispatch(apiCallStarted());         // call started
        fetch('http://localhost:3000/buzz',{
            method: 'post',
            credentials:'include',

            body: formData
        })

            .then(response => response.json())
            .then(data => {
                dispatch(apiCallSuccess(data)); 	// success

            })
            .catch(err => {
                dispatch(apiCallFailed(err));		// failure
            });
    }
};

export const asyncActionFetch = (offset) => {

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
                dispatch(apiFetchCallSuccess(data));       //success
            })
            .catch(err => {
                dispatch(apiFetchCallFailed(err));          //failure
            })
    }
};

export const asyncActionLikeDislike = (buzzSend) => {

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
        })

            .then(response => {
                return response.json();
            })                   //syntaxError: < undefined token....
            .then(data => {
                dispatch(apiLikeDislikeCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiLikeDislikeCallFailed(err));		// failure
            });
    }
};

export const asyncActionComment = (commentSend) => {

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
        })

            .then(response => {
                return response.json();
            })      //syntaxError: < undefined token....
            .then(data => {
                dispatch(apiCommentCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiCommentCallFailed(err));		// failure
            });
    }
};

export const asyncActionDelete = (deleteData) => {

    return (dispatch) => {              // this is store's dispatch method
        dispatch(apiDeleteCallStarted());         // call started
        fetch('http://localhost:3000/deleteBuzz',{
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
                dispatch(apiDeleteCallSuccess(data)); 	// success

            })
            .catch(err => {
                dispatch(apiDeleteCallFailed(err));		// failure
            });
    }
};


