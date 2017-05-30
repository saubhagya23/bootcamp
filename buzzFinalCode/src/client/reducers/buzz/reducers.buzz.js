/**
 * Created by saubhagya on 9/5/17.
 */

import { CREATE_BUZZ_STARTED, CREATE_BUZZ_SUCCESS, CREATE_BUZZ_FAILED,
    FETCH_BUZZ_STARTED, FETCH_BUZZ_SUCCESS, FETCH_BUZZ_FAILED,
    FETCH_COMMENT_STARTED, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILED,
    DELETE_BUZZ_STARTED, DELETE_BUZZ_SUCCESS, DELETE_BUZZ_FAILED,
    FETCH_LIKE_DISLIKE_STARTED, FETCH_LIKE_DISLIKE_SUCCESS, FETCH_LIKE_DISLIKE_FAILED} from '../../config/config.constantsForStore'

const buzzContent = {
    buzzData:[],
    loading:false,
    offset:0,
    err:null
};

export const buzzCreate = (state = buzzContent , action) => {
    switch(action.type){
        case 'CREATE_BUZZ_STARTED' : {
            return{
                ...state,
                loading:true
            }
        }

        case 'CREATE_BUZZ_SUCCESS' : {
                state.buzzData.unshift(action.val);
                const buzzCreated = state.buzzData;
                var offsetCreate = state.offset+1;

            return{
                ...state,
                buzzData:buzzCreated,
                loading:false,
                offset: offsetCreate
            }

        }

        case 'CREATE_BUZZ_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }

        case 'FETCH_BUZZ_STARTED' : {
            return{
                ...state,
                loading:true
            }

        }

        case 'FETCH_BUZZ_SUCCESS' : {
            var offset = state.offset+10;
            const buzzFetched = state.buzzData.concat(action.val)
            return{
                ...state,
                buzzData:buzzFetched,
                loading:false,
                offset: offset,
            }

        }

        case 'FETCH_BUZZ_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }

        case 'FETCH_LIKE_DISLIKE_STARTED' : {
            return{
                ...state,
                loading:true
            }

        }

        case 'FETCH_LIKE_DISLIKE_SUCCESS' : {

            const buzzFound = state.buzzData;

            buzzFound.map((buzz) => {
               if( buzz._id == action.val[0]._id){

                       buzz.like = action.val[0].like;
                       buzz.dislike = action.val[0].dislike;
               }

            });

            return{
                ...state,
                buzzData:buzzFound,
                loading:false
            }

        }

        case 'FETCH_LIKE_DISLIKE_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }

        case 'FETCH_COMMENT_STARTED' : {

            return{
                ...state,
                loading:true
            }

        }

        case 'FETCH_COMMENT_SUCCESS' : {

            var newCommentObj = {
                commentData:action.val.commentData,
                commentedBy:action.val.commentedBy
            }
            const buzzFound = state.buzzData;

            buzzFound.map((buzz) => {
                if( buzz._id == action.val.postId){

                    buzz.comments.push(newCommentObj);
                }

            });

            return{
                ...state,
                buzzData:buzzFound,
                loading:false
            }

        }

        case 'FETCH_COMMENT_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }

        case 'DELETE_BUZZ_STARTED' : {

            return{
                ...state,
                loading:true
            }
        }

        case 'DELETE_BUZZ_SUCCESS' : {

            var buzzPresent = state.buzzData;

            buzzPresent.map((buzz) => {
                if(buzz._id == action.val._id){
                    var index = buzzPresent.indexOf(buzz);

                    if (index > -1) {
                        buzzPresent.splice(index, 1);
                    }
                }
            })
            if(state.offset >10){
                var delOffset = state.offset - 1;

            }

            return{
                ...state,
                buzzData:buzzPresent,
                loading:false,
                offset: delOffset
            }

        }

        case 'DELETE_BUZZ_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }




    }
    return state;
};




