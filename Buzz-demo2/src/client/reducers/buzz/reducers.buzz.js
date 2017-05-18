/**
 * Created by saubhagya on 9/5/17.
 */

import { CREATE_BUZZ_STARTED, CREATE_BUZZ_SUCCESS, CREATE_BUZZ_FAILED,
    FETCH_BUZZ_STARTED, FETCH_BUZZ_SUCCESS, FETCH_BUZZ_FAILED,
    FETCH_LIKE_DISLIKE_STARTED, FETCH_LIKE_DISLIKE_SUCCESS, FETCH_LIKE_DISLIKE_FAILED} from '../../config/config.constantsForStore'

const buzzContent = {
    buzzData:[],
    loading:false,
    err:null
};

export const buzzCreate = (state = buzzContent , action) => {
    switch(action.type){
        case 'CREATE_BUZZ_STARTED' : {
            console.log('create buzz started------------');
            return{
                ...state,
                loading:true
            }
        }

        case 'CREATE_BUZZ_SUCCESS' : {
                console.log("action.val foe finding reducers",action.val);
                const buzzCreated = state.buzzData.concat(action.val)
                console.log(buzzCreated,"**********reducer create buzz success")
            return{
                ...state,
                buzzData:buzzCreated,
                loading:false
            }
        }

        case 'CREATE_BUZZ_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }
        }

        /*case 'FETCH_LIKE_DISLIKE_STARTED' : {
            console.log('create like dislike started------------');
            return{
                ...state,
                loading:true
            }
        }

        case 'FETCH_LIKE_DISLIKE_SUCCESS' : {
            console.log("action.val for like or dislike reducers",action.val);
            const likeDislike = state.buzzData.concat(action.val)
            console.log(likeDislike,"**********reducer like/dislike buzz success")
            return{
                ...state,
                buzzData:likeDislike,
                loading:false
            }
        }

        case 'FETCH_LIKE_DISLIKE_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }
        }*/

    }
    return state;
};


const buzzListContent = {
    buzzListData:[],
    loading:false,
    err:null
};

export const buzzFetch = (state = buzzListContent , action) => {
    switch(action.type){
        case 'FETCH_BUZZ_STARTED' : {
            return{
                ...state,
                loading:true
            }
        }

        case 'FETCH_BUZZ_SUCCESS' : {
            console.log('action.val in fetch buzzes>>>>>>>>>>>>>>>>>>>>>>>>>',action.val);
            const buzzFetched = state.buzzListData.concat(action.val)
            console.log(buzzFetched,"**********reducer fetch users success")
            return{
                ...state,
                buzzListData:buzzFetched,
                loading:false
            }
        }

        case 'FETCH_BUZZ_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }
        }
    }
    return state;
};

