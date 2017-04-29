/**
 * Created by saubhagya on 28/4/17.
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { asyncActionEdit } from '../actions/index'
import UserListContainer from './UserList'
//import UserDisplay from './UserDisplay'

class NewUpdate extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.props1,'props that we are getting from userinfo')

        this.state={
            Obj1:{}
        }

    }

    editHandler = (event) => {
        event.preventDefault();
        var NewObj1 = {
            name : this.props.props1,
            email:event.target.value
        }

        this.setState({
            Obj1:NewObj1
        })
    }

    onClickHandler = () => {
        console.log('props in new update------------',this.props);
        if(this.state.Obj1.email == null){
            alert('user dont have an email id');
        }
        else
        {
            this.props.dispatch(asyncActionEdit(this.props.props1,this.state.Obj1.email));
            console.log(this.state.Obj1,'Obj1>>>>>>>>>>>>>>>');
            /*this.props.history.push('/');*/
        }
    }



        render(){
            return(
                <div>
                    <input type="text" value={this.state.Obj1.email} onChange={this.editHandler.bind(this)}/>
                    <button onClick={this.onClickHandler.bind(this)}>SAVE</button>
                    {this.props.props1}
                </div>
            )

        }

}

const mapStateToProps = state => state;

const UserUpdateContainer = connect(mapStateToProps)(NewUpdate);
export default UserUpdateContainer;