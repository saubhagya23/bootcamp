import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//require('./index.css');

import ttnLogo from './assets/images/ttnLogo.png';
import ttnBackgrnd from './assets/images/ttnBackgrnd.jpg';
//import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
//import Login from './../client/components/login/Login'

class App extends Component{
    constructor(){
        super();
        /*this.state = {
            showComponent: false,
        };
        this._onButtonClick = this._onButtonClick.bind(this);*/
    }

    /*_onButtonClick(event){
        event.preventDefault();
        this.setState({
            showComponent: true
        });
    }*/

    render(){
        return(
            <div className="container1 ">

                <img src={ttnBackgrnd} alt="something here" className="containerImage"/>

                <div className="div1">

                    <img src={ttnLogo} alt="something here" className="logoImage"/>
                    <h3 className="login-header">Create your own buzz</h3>

                    <ul>
                                <li className="login-button"><a href='http://localhost:3000/login'>login with google</a></li>

                    </ul>

                </div>

            </div>
        );
    }
}

export default App;

/*
 class App extends Component {
 render() {
 return (
 <div className="App">
 <div className="App-header">
 <img src={logo} className="App-logo" alt="logo" />
 <h2>Welcome to React</h2>
 </div>
 <p className="App-intro">
 To get started, edit <code>src/App.js</code> and save to reload.
 </p>
 </div>
 );
 }
 }
 */
