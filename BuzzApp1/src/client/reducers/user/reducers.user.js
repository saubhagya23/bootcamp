/**
 * Created by saubhagya on 11/5/17.
 */

import {
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
    FETCH_USER_SESSION_STARTED,
    FETCH_USER_SESSION_SUCCESS,
    FETCH_USER_SESSION_FAILED,
    /*FETCH_USER_LOGOUT_STARTED,
    FETCH_USER_LOGOUT_SUCCESS,
    FETCH_USER_LOGOUT_FAILED*/
} from '../../config/config.constantsForStore'

const sessionUser = {
    sessionData:null,
    loading:true,
    err:null
};

const newUser = {
    newUser:null,
    loader:false,
    err:null
}

export const sessionCreate = (state = sessionUser , action) => {
    switch(action.type){
        case 'FETCH_USER_STARTED' : {

            console.log('session of user started------------',state);
            return{
                ...state,
                loading:true
            }
        }

        case 'FETCH_USER_SUCCESS' : {
            console.log("action.val for finding reducers",action.val);

            return{
                ...state,
                sessionData:action.val,
                loading:false
            }
        }

        case 'FETCH_USER_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }
        }


        case 'FETCH_USER_SESSION_STARTED' : {
            return{
                ...state,
                loader:true,
            }
        }

        case 'FETCH_USER_SESSION_SUCCESS' : {
            return{
                ...state,
                newUser: action.val,
                loader: false
            }
        }

        case 'FETCH_USER_SESSION_FAILED' : {
            return{
                ...state,
                loader: false,
                err:action.err
            }
        }

        /*case 'FETCH_USER_LOGOUT_STARTED' : {
            //console.log('hhdhdh')
            console.log('session of user started------------',state);
            return{
                ...state,
                loading:true
            }
        }

        case 'FETCH_USER_LOGOUT_SUCCESS' : {
            console.log("action.val for logout reducers",action.val);
            /!*const sessionCreated = state.sessionData.concat(action.val)
             console.log(sessionCreated[0].googleId,"**********reducer user session success")*!/
            return{
                ...state,
                sessionData:action.val,
                loading:false
            }
        }

        case 'FETCH_USER_LOGOUT_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }
        }*/

    }
    return state;
};


