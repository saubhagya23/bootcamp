/**
 * Created by saubhagya on 16/5/17.
 */

//import {asyncActionUserSession} from './../../actions/user/actionsUser.index'
let user = '';


export default function AuthService() {
    return {
        getUser : function(){
            if(user){
                return user;
            }
            else{
                //get user

            }
        },

        setUser : function(loginUser){
            user = loginUser;
        }
    }
}



