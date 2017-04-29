/**
 * Created by saubhagya on 25/4/17.
 */

import {FETCH_USER_STARTED, FETCH_USER_SUCCESS, FETCH_USER_FAILED, DELETE_USER_STARTED, DELETE_USER_SUCCESS, DELETE_USER_FAILED, EDIT_USER_STARTED, EDIT_USER_SUCCESS, EDIT_USER_FAILED} from './../config/config.constants'

const userInfo = {
    usersData:[],
    loading:false,
    err:null
};

export const userFetch = (state = userInfo , action) => {
    switch(action.type){
        case FETCH_USER_STARTED:{
            return{
                ...state,
                loading:true
            }
        }

        case FETCH_USER_SUCCESS:{
            const user = state.usersData.concat(action.val)
            console.log(user,"**********reducer fetch users success")
            return{
                ...state,
                usersData:user,
                loading:false
            }
        }

        case FETCH_USER_FAILED:{
            return{
                ...state,
                loading:false,
                err:action.err
            }
        }

        case DELETE_USER_STARTED:{
            return{
                ...state,
                loading:true
            }
        }

        case DELETE_USER_SUCCESS:{
            const user =action.val
            console.log(user,"**********reducer delete users success")
            return{
                ...state,
                usersData:user,
                loading:false
            }
        }

        case DELETE_USER_FAILED:{
            return{
                ...state,
                loading:false,
                err:action.err
            }
        }
        case EDIT_USER_STARTED:{
            return{
                ...state,
                loading:true
            }
        }

        case EDIT_USER_SUCCESS:{
            const user =action.val
            console.log(user,"**********reducer edit users success")
            return{
                ...state,
                usersData:user,
                loading:false
            }
        }

        case EDIT_USER_FAILED:{
            return{
                ...state,
                loading:false,
                err:action.err
            }
        }
    }
    return state;
};

