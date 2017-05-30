/**
 * Created by saubhagya on 9/5/17.
 */

import React, { Component } from 'react';
import './../../../../src/App.css'
import ttnLogo1 from './../../../assets/images/ttnLogo1.png';
import ttnBackgrnd from './../../../assets/images/ttnBackgrnd.jpg';
import isAuthenticate from './isAuth'


class Main extends Component{
    constructor(){
        super();
    }


    render(){
        return(
            <div className="container1 ">

                <img src={ttnBackgrnd} alt="something here" className="containerImage"/>

                <div className="div1">

                    <img src={ttnLogo1} alt="something here" className="logoImage"/>
                    <h3 className="login-header">Create your own buzz</h3>

                    <ul className=" no-padding">
                        <li className="login-button"><a href='http://localhost:3000/login'>login with google</a></li>
                    </ul>

                </div>

            </div>
        );
    }
}



export default isAuthenticate(false)(Main);


