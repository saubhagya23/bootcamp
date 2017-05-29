/**
 * Created by saubhagya on 16/5/17.
 */

import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {asyncActionUserSession} from './../../actions/user/actionsUser.index'

export default (isAuthRoute) => (NewComponent) => {
    class Auth extends React.Component {
        componentWillMount () {
            this.props.dispatch(asyncActionUserSession());
        }
        render() {
            const { props } = this;
            if (props.sessionCreate.loading) {
                return <div>loading...</div>
            }
            if (isAuthRoute){
                if(props.sessionCreate.sessionData) {
                    return <NewComponent {...this.props} />
                } else {
                    return <Redirect to="/"/>
                }
            }else if(props.sessionCreate.sessionData) {
                return <Redirect to='/home'/>
            } else {
                return <NewComponent {...this.props}/>
            }
        }
    }


    const mapStateToProps = state => {
        console.log(state, "###############")
        return state;
    };

    return connect(mapStateToProps)(Auth);

}

