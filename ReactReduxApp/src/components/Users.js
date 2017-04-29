/**
 * Created by saubhagya on 27/4/17.
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { asyncAction } from '../actions/index'
import UserListContainer from './UserList'
//import UserDisplay from './UserDisplay'

class Users extends Component{
    constructor(props){
        super(props);
    }


   render(){
        /*const users = this.props.usersData;
        console.log(users,"-----users")
        console.log("userdata..................",this.props);*/
        return(
            <div>


                    <div>
                        <Link to="/Users"> Users List </Link>
                    </div>
            </div>
        )
   }
}

const mapStateToProps = state => state;

const UsersContainer = connect(mapStateToProps)(Users);
export default UsersContainer;

