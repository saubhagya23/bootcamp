/**
 * Created by saubhagya on 28/4/17.
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import { browserHistory as history } from 'react-router'
import { connect } from 'react-redux'
import { asyncActionDel } from '../actions/index'
import NewUpdate from './NewUpdate'

import UserListContainer from './UserList'
//import UserDisplay from './UserDisplay'

class UserInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            edit:false
        }
    }



    deleteHandler = () => {
        this.props.dispatch(asyncActionDel(this.props.match.params.name));
        this.props.history.push('/');
    };


    render(){
        console.log(this.props,'props in  userInfo---------');
        const userGot = this.props.usersData;
        console.log(userGot,'userGot>>>>>>>>>>>');
        console.log("inside userinfo");
        var paramName = this.props.match.params.name;
        //const userInReq = this.props.match.params.name;
        return(
            <div>
                {this.state.edit?
                <NewUpdate props1={paramName} props={this.props}/>
                :
                userGot.map((items) => {
                    var name=items.name;

                    if(name==paramName){
                        return (<p>{items.email}
                            <button onClick={(event) => {this.setState({edit:true})}}>EDIT</button>
                            <button onClick={this.deleteHandler.bind(this)}>DELETE</button>
                        </p> )
                    }
                })
            }

            </div>
        )
    }
}

const mapStateToProps = state => state;

const UserInfoContainer = connect(mapStateToProps)(UserInfo);
export default UserInfoContainer;