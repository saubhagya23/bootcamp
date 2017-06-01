/**
 * Created by saubhagya on 28/5/17.
 */

import { CREATE_COMPLAINT_STARTED, CREATE_COMPLAINT_SUCCESS, CREATE_COMPLAINT_FAILED ,
    FETCH_COMPLAINT_STARTED, FETCH_COMPLAINT_SUCCESS, FETCH_COMPLAINT_FAILED,
    COMPLAINT_STATUS_STARTED, COMPLAINT_STATUS_SUCCESS, COMPLAINT_STATUS_FAILED,
    RESOLVED_COMPLAINT_STARTED, RESOLVED_COMPLAINT_SUCCESS, RESOLVED_COMPLAINT_FAILED,
    DELETE_COMPLAINT_STARTED, DELETE_COMPLAINT_SUCCESS, DELETE_COMPLAINT_FAILED} from '../../config/config.constantsForStore'

const compInfo = {
    compData:[],
    loading:false,
    offset:0,
    err:null
};

export const complaintCreate = (state = compInfo , action) => {
    switch(action.type){
        case 'CREATE_COMPLAINT_STARTED' : {

            return{
                ...state,
                loading:true
            }
        }

        case 'CREATE_COMPLAINT_SUCCESS' : {

            state.compData.unshift(action.val);
            const compCreated = state.compData;
            var offsetCreate = state.offset+1;


            return{
                ...state,
                compData:compCreated,
                loading:false,
                offset: offsetCreate
            }

        }

        case 'CREATE_COMPLAINT_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }

        case 'FETCH_COMPLAINT_STARTED' : {
            return{
                ...state,
                loading:true
            }

        }

        case 'FETCH_COMPLAINT_SUCCESS' : {

            var offsetFetch = state.offset+10;
            const compFetched = state.compData.concat(action.val)
            return{
                ...state,
                compData:compFetched,
                loading:false,
                offset: offsetFetch,
            }

        }

        case 'FETCH_COMPLAINT_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }

        case 'COMPLAINT_STATUS_STARTED' : {

            return{
                ...state,
                loading:true
            }

        }

        case 'COMPLAINT_STATUS_SUCCESS' : {

            const compFound = state.compData;
            if(action.val.compStatus == 'Resolved'){

                compFound.map((complaint) => {
                    if( complaint._id == action.val.compId){
                        complaint.compStatus = action.val.compStatus;
                    }
                });
            }
            else{

                compFound.map((complaint) => {
                    if(complaint._id == action.val.compId){
                        var index = compFound.indexOf(complaint);

                        if (index > -1) {
                            compFound.splice(index, 1);
                        }
                    }
                })
                if(state.offset >10){
                    var statusOffset = state.offset - 1;

                }
            }


            return{
                ...state,
                compData:compFound,
                loading:false,
                offset:statusOffset
            }

        }

        case 'COMPLAINT_STATUS_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }

        case 'RESOLVED_COMPLAINT_STARTED' : {
            return{
                ...state,
                loading:true
            }

        }

        case 'RESOLVED_COMPLAINT_SUCCESS' : {

            var offset = state.offset+10;
            const compFetched = state.compData.concat(action.val)

            return{
                ...state,
                compData:compFetched,
                loading:false,
                offset: offset,
            }

        }

        case 'RESOLVED_COMPLAINT_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }

        case 'DELETE_COMPLAINT_STARTED' : {

            return{
                ...state,
                loading:true
            }
        }

        case 'DELETE_COMPLAINT_SUCCESS' : {

            var compPresent = state.buzzData;

            compPresent.map((complaint) => {
                if(complaint._id == action.val.compId){
                    var index = compPresent.indexOf(complaint);

                    if (index > -1) {
                        compPresent.splice(index, 1);
                    }
                }
            })
            if(state.offset >10){
                var delOffset = state.offset - 1;

            }

            return{
                ...state,
                compData:compPresent,
                loading:false,
                offset: delOffset
            }

        }

        case 'DELETE_COMPLAINT_FAILED' : {
            return{
                ...state,
                loading:false,
                err:action.err
            }

        }



    }
    return state;
};
