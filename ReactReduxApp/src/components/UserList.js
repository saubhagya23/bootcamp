/**
 * Created by saubhagya on 28/4/17.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { asyncAction } from '../actions/index'
//import UserDisplay from './UserDisplay'
import UserInfo from './UserInfo'

class UserList extends Component{
    constructor(props){
        super(props);
    }

    /*componentWillMount(props)
    {
        this.props.dispatch(asyncAction());
    }*/

    render(){
        const list = this.props.usersData;
        console.log('list',list);
        const localState = this.props;
        console.log('localdata',localState);

        return(
               <div>
                    {
                        (localState.loading)?
                            <h3>List not loaded yet</h3>:
                            (localState.usersData.length)?
                                <ul>
                                    {
                                    list.map((user1) => (
                                        <li key={user1._id}>
                                            <Link to={`/Users/${user1.name}`}>{user1.name}</Link>
                                        </li>
                                    ))
                                }
                                </ul>
                                :
                                    <h3>no users present</h3>

                    }
                </div>


        )
    }
}

const mapStateToProps = state => state;

const UserListContainer = connect(mapStateToProps)(UserList);
export default UserListContainer;

{/*<Router>
 <div>
 <li key={_id}><Link to="/UserList">{list.map(user) => {user.name}}</Link></li>
 <Route path="/UserList" component={(props) => {<>}/>
 </div>
 </Router>*/}

{/*{localState.loading ?
 <h3>list not loaded yet</h3> :
 localState.usersData.length ?
 <Router>
 <div>
 <li key={list._id}><link to="/Users">{list.map((user) => user.name)}</link></li> : <h3>no users</h3>
 <Route exact path="/Users" component={(props) => {<UsersContainer user={this.props}{...props}/>}}/>
 </div>
 </Router>
 }*/}