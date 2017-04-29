/**
 * Created by saubhagya on 25/4/17.
 */

export const UserMiddleware = (store) => (next) => (action) => {
    console.log('logger executing');
    console.log(action.type, store.getState());
    next(action);
};