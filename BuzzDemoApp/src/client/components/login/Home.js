/**
 * Created by saubhagya on 5/5/17.
 */

import React, { Component } from 'react';
import '../../../assets/css/Home.css'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import ttnLogo from './../../../assets/images/ttnLogo.png';
import bgCover from './../../../assets/images/image.jpg'
import editIcon from './../../../assets/images/editIcon.png'
//import Buzz from './../../components/buzz/Buzz'
import './../../../assets/css/Buzz.css'
import {asyncAction,asyncActionUserSession} from '../../actions/buzz/actionsBuzz.index'
import { connect } from 'react-redux'
import BuzzList from './../../components/buzz/BuzzList'

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            buzzContent:'',
            category: 'Activity',
            buzzImage:'',
            display:false
        };
    }

    componentWillMount(){
        this.props.dispatch(asyncActionUserSession());
    }

    onBuzzContent = (event) => {
        event.preventDefault();
        this.setState({buzzContent : event.target.value});
    };

    onChangeCategory = (e) => {
        if(e.target.value == 'Activity'){
            this.setState({
                category:'Activity'
            });
        }
        else
        {
            this.setState({
                category:'Lost and Found'
            });
        }

    };

    createBuzz = () => {
        var newBuzz = this.state;
        console.log('newBuzz',newBuzz);
        /*this.setState({
           display: true
        });*/
        this.state.display = true;
        console.log('new states',this.state.display);
        this.props.dispatch(asyncAction(this.state));

        /*if(this.state.display == true){
            console.log("state in if",this.state.display);
            this.props.dispatch(asyncActionFetch());
        }else{}*/

    };

    /*displayBuzz = () => {
        if(this.state.display == true){
            this.props.dispatch(asyncActionFetch(this.state));
        }
    }*/


    /* activityClicked =() => {
         console.log('activity is to be created.........');
     }*/

    render(){
        console.log("props found in Home.js",this.props);
        return(
            <div>
                <button>Log Out</button>
                <img className="logo" src={ttnLogo}/>
                <div className="banner-image" >
                    <img className="banr" src={bgCover}/>
                    <div className="text-on-image">
                    <p>POSTING YOUR THOUGHTS</p>
                    <p>NEVER BEEN SO EASY...</p>
                    </div>
                </div>

                <div className="wrapper">
                    <ul className="main-menu">
                        <li> <a href="#"> BUZZ <span>&#10095;</span> </a> </li>
                        <li> <a href="#"> COMPLAINTS <span>&#10095;</span> </a> </li>
                        <li> <a href="#"> RESOLVED <span>&#10095;</span> </a> </li>
                    </ul>

                    <div className="sidebar-footer">
                        <p>@ 2017, To The New</p>

                        <ul className="help-menu">
                            <li> <a href="#"> About </a> </li>
                            <li> <a href="#"> Help </a> </li>
                        </ul>
                    </div>

                </div>
                <div className="wrapper-create-buzz">

                    <p><img src={editIcon} alt="editIcon"/>Create a Buzz</p>

                    <textarea rows="10" cols="100" placeholder="create a buzz" className="buzz-details" onChange={this.onBuzzContent.bind(this)} value={this.state.buzzContent}></textarea>

                    {/*<div className="dropdown">
                        <button className="dropbtn" title="Select a category of your buzz">Activity &#9663;</button>
                        <div className="dropdown-content">
                            <a href="#" onChange={this.onChangeCategory.bind(this)} value='Activity'>Activity</a>
                            <a href="#" onChange={this.onChangeCategory.bind(this)} value='Lost and Found'>Lost and Found</a>
                        </div>
                    </div>*/}
                    <select className="dropdown" onChange={this.onChangeCategory.bind(this)}>
                        <option value="Activity">Activity</option>
                        <option value="Lost and Found">Lost and Found</option>
                    </select>

                    <div className="upload">
                        <input type="file" id="clickMe" accept="image/*"/>
                    </div>

                    <input type="submit" className="submit-buzz" onClick={this.createBuzz.bind(this)}/>

                </div>

                {/*<div>
                    {(this.state.display)?
                        <p>buzz created and available!!!</p>:
                                <p>no buzz available!!!</p>
                    }
                </div>*/}
                <Router>
                    <div>
                        {(this.state.display == true) ?
                            <Route path="/home" component={BuzzList}/>:<p>no buzz available!!!</p>
                        }
                    </div>
                </Router>

            </div>

        )
    }
}

const mapStateToProps = state => state;

const HomeContainer = connect(mapStateToProps)(Home);
export default HomeContainer;


//===================================

/*
onChange={this.onBuzzContent}
onChange={this.onChangeCategory}
onChange={this.onChangeCategory}
onClick={this.createBuzz.bind(this)}
 onClick="upload()"

 <div className="dropdown">
 <button className="dropbtn" title="Select a category of your buzz">Activity &#9663;</button>
 <div className="dropdown-content">
 <a href="#" onChange={this.onChangeCategory.bind(this)} value='Activity'>Activity</a>
 <a href="#" onChange={this.onChangeCategory.bind(this)} value='Lost and Found'>Lost and Found</a>
 </div>
 </div>

 */
