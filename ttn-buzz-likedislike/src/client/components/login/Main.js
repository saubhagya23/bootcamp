/**
 * Created by saubhagya on 9/5/17.
 */

import React, { Component } from 'react';
import './../../../../src/App.css'
import ttnLogo from './../../../assets/images/ttnLogo.png';
import ttnBackgrnd from './../../../assets/images/ttnBackgrnd.jpg';
/*import isAuthenticate from './isAuth'
import { connect } from 'react-redux'*/
//import Home from './../client/components/login/Home'

class Main extends Component{
    constructor(){
        super();
    }


    render(){
        return(
            <div className="container1 ">

                <img src={ttnBackgrnd} alt="something here" className="containerImage"/>

                <div className="div1">

                    <img src={ttnLogo} alt="something here" className="logoImage"/>
                    <h3 className="login-header">Create your own buzz</h3>

                    <ul className=" no-padding">
                        <li className="login-button"><a href='http://localhost:3000/login'>login with google</a></li>
                    </ul>

                </div>

            </div>
        );
    }
}

export default Main;

/*
const mapStateToProps = state => {
    console.log(state, "###############")
    return state;
};

const MainContainer = connect(mapStateToProps)(isAuthenticate(Main));
export default MainContainer;
*/
