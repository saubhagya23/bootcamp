import React, { Component } from 'react';
//import logo from './logo.svg';
//import './../src/App.css';
//require('./index.css');
import {render} from 'react-dom'

/*import ttnLogo from './assets/images/ttnLogo.png';
import ttnBackgrnd from './assets/images/ttnBackgrnd.jpg'*/;
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Main from './client/components/login/Main'
import Home from './client/components/login/Home'
import Buzz from './client/components/buzz/Buzz'
import Complaints from './client/components/complaints/Complaints'

class App extends Component{
    constructor()
    {
        super();
        /*this.state = {
            showComponent: false,
        };
        this._onButtonClick = this._onButtonClick.bind(this);*/
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
