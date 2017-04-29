/**
 * Created by saubhagya on 24/4/17.
 */

import { createStore } from 'redux'

const reducer = ({state = {a:10, counter:val},action}) => {
    switch(action.type){
        case 'INC' : {
            return {
                ...state, counter:state.counter + val
            }
        }

        case 'DEC' : {
            return {
                    ...state, counter:state.counter - val
            }
        }
    }
};

function increment(val){
    return {type:'INC' , val};
}


function decrement(val){
    return {type:'DEC' , val};
}

let store = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(increment(1));
store.dispatch(increment(2));
store.dispatch(increment(3));
store.dispatch(increment(4));
store.dispatch(decrement(1));
store.dispatch(decrement(1));

