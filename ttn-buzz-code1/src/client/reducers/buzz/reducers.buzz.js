/**
 * Created by saubhagya on 9/5/17.
 */

import { CREATE_BUZZ_STARTED, CREATE_BUZZ_SUCCESS, CREATE_BUZZ_FAILED,
    FETCH_BUZZ_STARTED, FETCH_BUZZ_SUCCESS, FETCH_BUZZ_FAILED,
    FETCH_COMMENT_STARTED, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILED,
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
            console.log('create buzz started------------');
            return{
                ...state,
                loading:true
            }
        }

        case 'CREATE_BUZZ_SUCCESS' : {
                console.log("action.val foe finding reducers",action.val);
                state.buzzData.unshift(action.val);
                const buzzCreated = state.buzzData;
                var offset = state.offset+1;
                console.log('offset??????????',offset);
                console.log("**********reducer create buzz success",buzzCreated.length,"is buzzData an array?=======",Array.isArray(buzzCreated));


            return{
                ...state,
                buzzData:buzzCreated,
                loading:false,
                offset: offset
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
            console.log('action.val in fetch buzzes>>>>>>>>>>>>>>>>>>>>>>>>>',action.val);
            var offset = state.offset+10;
            const buzzFetched = state.buzzData.concat(action.val)
            console.log(buzzFetched,"**********reducer fetch users success")
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
            console.log('create like dislike started------------');
            return{
                ...state,
                loading:true
            }

        }

        case 'FETCH_LIKE_DISLIKE_SUCCESS' : {
            console.log("action.val for like or dislike reducers",action.val);
            const buzzFound = state.buzzData;
            console.log('buzzFound+++++++++++',buzzFound);
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
            console.log('create comment started------------');
            return{
                ...state,
                loading:true
            }

        }

        case 'FETCH_COMMENT_SUCCESS' : {
            console.log("action.val for comment reducers",action.val);
            var newCommentObj = {
                commentData:action.val.commentData,
                commentedBy:action.val.commentedBy
            }
            const buzzFound = state.buzzData;
            console.log('buzzFound+++++++++++',buzzFound);
            buzzFound.map((buzz) => {
                if( buzz._id == action.val.postId){

                    buzz.comment.concat(newCommentObj);
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



    }
    return state;
};




