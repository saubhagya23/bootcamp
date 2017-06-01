import React, { Component } from 'react';
import {render} from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './client/components/login/Main'
import Home from './client/components/login/Home'
import Complaints from './client/components/complaints/Complaints'
import Resolved from './client/components/complaints/Resolved'
import NotFound from './client/components/errorPages/NotFound'


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
                        <Route path='/complaints' component={Complaints}/>
                        <Route path='/resolved' component={Resolved}/>

                        <Route path="*" component={NotFound} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;


