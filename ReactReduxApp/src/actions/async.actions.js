/**
 * Created by saubhagya on 25/4/17.
 */
import fetch from 'isomorphic-fetch'
import {FETCH_USER_STARTED, FETCH_USER_SUCCESS, FETCH_USER_FAILED} from './../config/config.constants'
import {apiCallStarted, apiCallSuccess, apiCallFailed, apiCallUserDelStarted, apiCallUserDelSuccess, apiCallUserDelFailed, apiCallUserEditStarted, apiCallUserEditSuccess, apiCallUserEditFailed} from './app.actions'

export const asyncAction = () => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(apiCallStarted()); // call started
        fetch('http://localhost:3000/Users',{
            method: 'get',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            }
        })  //when :name was provided , it started fetching data from DB.solved the error...

            .then(response => response.json())      //syntaxError: < undefined token....
            .then(data => {
                dispatch(apiCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiCallFailed(err));		// failure
            });
    }
};

export const asyncActionDel = (userDel) => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(apiCallUserDelStarted()); // call started
        fetch('http://localhost:3000/Users',{
            method: 'delete',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserName:userDel
            })
        })

            .then(response => response.json())      //syntaxError: < undefined token....
            .then(data => {
                dispatch(apiCallUserDelSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiCallUserDelFailed(err));		// failure
            });
    }
};

export const asyncActionEdit = (username1,userEdit) => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(apiCallUserEditStarted()); // call started
        fetch('http://localhost:3000/Users',{
            method: 'put',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserName : username1,
                email:userEdit
            })
        })

            .then(response => response.json())      //syntaxError: < undefined token....
            .then(data => {
                dispatch(apiCallUserEditSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(apiCallUserEditFailed(err));		// failure
            });
    }
};