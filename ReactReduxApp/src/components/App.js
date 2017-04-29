/**
 * Created by saubhagya on 26/4/17.
 */

import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { asyncAction } from '../actions/index'
import {Home} from './Home'
//import {Users} from './Users'
import Users from './Users'
import UserInfo from './UserInfo'
import UserListContainer from './UserList'
import {userFetch} from '../reducers/index'

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(props)
    {
        this.props.dispatch(asyncAction());
    }

    render(){
        console.log('props on App.js>>>>>>>>>>>>>>>>>>>>>>',this.props);
        return(
            <Router>
                <div>
                    <h2>Click below to get user list</h2>

                    <Route path="/" component={Users}/>
                    <Route path="/Users" component={UserListContainer}/>
                    <Route exact path="/Users/:name"  component={UserInfo}/>
                </div>
            </Router>

        );
    }

}

const mapStateToProps = state => state;

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;


/*const list = this.props.usersData;
 console.log('list',list);
 const localState = this.props;
 console.log('localdata',localState);*/
//console.log('length>>>>>',localState.usersData.length);
/*<div>
 <h2>List of users</h2>{localState.loading ?
 <h3>list not loaded yet</h3> :
 localState.usersData.length ?
 <Router>
 <div>
 <li key={list._id}><link to="/Users">{list.map((user) => user.name)}</link></li> : <h3>no users</h3>
 <Route exact path="/Users" component={(props) => {<UsersContainer user={this.props}{...props}/>}}/>
 </div>
 </Router>
 }
 </div>*/