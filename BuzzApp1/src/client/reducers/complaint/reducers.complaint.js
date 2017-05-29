/**
 * Created by saubhagya on 28/5/17.
 */

import { CREATE_COMPLAINT_STARTED, CREATE_COMPLAINT_SUCCESS, CREATE_COMPLAINT_FAILED ,
    FETCH_COMPLAINT_STARTED, FETCH_COMPLAINT_SUCCESS, FETCH_COMPLAINT_FAILED,
    COMPLAINT_STATUS_STARTED, COMPLAINT_STATUS_SUCCESS, COMPLAINT_STATUS_FAILED,
    RESOLVED_COMPLAINT_STARTED, RESOLVED_COMPLAINT_SUCCESS, RESOLVED_COMPLAINT_FAILED} from '../../config/config.constantsForStore'

const compInfo = {
    compData:[],
    loading:false,
    offset:0,
    err:null
};

export const complaintCreate = (state = compInfo , action) => {
    switch(action.type){
        case 'CREATE_COMPLAINT_STARTED' : {
            console.log('create buzz started------------');
            return{
                ...state,
                loading:true
            }
        }

        case 'CREATE_COMPLAINT_SUCCESS' : {
            console.log("action.val foe finding reducers",action.val);
            state.compData.unshift(action.val);
            const compCreated = state.compData;
            var offset = state.offset+1;
            console.log('offset??????????',offset);
            console.log("**********reducer create buzz success",compCreated.length,"is buzzData an array?=======",Array.isArray(compCreated));


            return{
                ...state,
                compData:compCreated,
                loading:false,
                offset: offset
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
            console.log('action.val in fetch complaints>>>>>>>>>>>>>>>>>>>>>>>>>',action.val);
            var offset = state.offset+10;
            const compFetched = state.compData.concat(action.val)
            console.log(compFetched,"**********reducer fetch complaint success")
            return{
                ...state,
                compData:compFetched,
                loading:false,
                offset: offset,
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
            console.log('close complaint started------------');
            return{
                ...state,
                loading:true
            }

        }

        case 'COMPLAINT_STATUS_SUCCESS' : {
            console.log("action.val for comp status reducers",action.val);
            if(action.val.compStatus == 'Resolved'){
                const compFound = state.compData;
                compFound.map((complaint) => {
                    if( complaint._id == action.val.compId){
                        complaint.compStatus = action.val.compStatus;
                    }
                });
            }
            else{
                const compFound = state.compData;
                console.log(' complaints Present--',compFound);
                compFound.map((complaint) => {
                    if(complaint._id == action.val.compId){
                        var index = compFound.indexOf(complaint);
                        console.log("++++++",index);
                        if (index > -1) {
                            compFound.splice(index, 1);
                        }
                    }
                })
                if(state.offset >10){
                    var delOffset = state.offset - 1;
                    console.log('????',delOffset);
                }
            }


            return{
                ...state,
                compData:compFound,
                loading:false
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
            console.log('action.val in resolved complaints>>>>>>>>>>>>>>>>>>>>>>>>>',action.val);
            var offset = state.offset+10;
            const compFetched = state.compData.concat(action.val)
            console.log(compFetched,"**********reducer fetch resolved comp success")
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



    }
    return state;
};
