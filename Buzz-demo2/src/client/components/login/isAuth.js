/**
 * Created by saubhagya on 16/5/17.
 */

import React from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import {asyncActionUserSession , asyncActionUserLogout} from './../../actions/user/actionsUser.index'

export default function isAuthenticate(NewComponent){
    class Auth extends React.Component {
        componentDidMount () {
            this.props.dispatch(asyncActionUserSession());
        }
        render() {
            const { props } = this;
            if (props.sessionCreate.sessionData || props.sessionCreate.loading) {
                return <NewComponent {...props}/>
            } else {

                return <Redirect to="/"/>
            }
        }
    }

    /*const Auth = (props) => {
        console.log('data recieved in isAuth',props);
         //if(){
            if(props && props.sessionCreated && props.sessionCreated.sessionData != null){
                return <NewComponent {...props}/>
            }
            else{
                return <div>Loading.....</div>

            }
        // }

    }*/

    const mapStateToProps = state => {
        console.log(state, "###############")
        return state;
    };

    return connect(mapStateToProps)(Auth);

}


/*
const mapStateToProps = state => {
    console.log(state, "###############", state)
    return state;
};

export default connect(mapStateToProps)(isAuthenticate);
*/
