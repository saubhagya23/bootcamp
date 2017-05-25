import React, { Component } from 'react';
import {render} from 'react-dom'

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Main from './client/components/login/Main'
import Home from './client/components/login/Home'
import Buzz from './client/components/buzz/Buzz'
import Complaints from './client/components/complaints/Complaints'



class App extends Component{
    constructor()
    {
        super();

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


