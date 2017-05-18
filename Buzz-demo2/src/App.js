import React, { Component } from 'react';
//import logo from './logo.svg';
//import './../src/App.css';
//require('./index.css');
import {render} from 'react-dom'

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Main from './client/components/login/Main'
import Home from './client/components/login/Home'
import Buzz from './client/components/buzz/Buzz'
import Complaints from './client/components/complaints/Complaints'

//import AuthService from './client/components/login/AuthService'
//import loggedUser from './client/actions/user/user.asyncActions'

class App extends Component{
    constructor()
    {
        super();

    }

    componentWillMount(){
        console.log('props in app.js-------->>>>',this.props);
       //fetch('http://localhost:3000/userSession');

        //this.props.dispatch(asyncActionSession());

      /*  fetch('http://localhost:3000/userSession',{
            method: 'get',
            credentials:'include',

        })
            .then(response => {
            })
            .then(data => {

            })
            .catch(err => {

            })*/


       /*setTimeout(function () {
           fetch('http://localhost:3000/userSession');

       }, 0)*/
      /*let newUser = AuthService().setUser(this.props);
        console.log('data found in App.js==============',newUser);*/
    }


    render(){
        return(
            <div>
                <Router>
                    <div>
                        <Route exact path='/' component={Main}/>
                        <Route path='/home' component={Home}/>
                        <Route path='/buzz' component={Buzz}/>
                        <Route path='/complaints' component={Complaints}/>

                    </div>
                </Router>
            </div>
        );
    }
}

export default App;


