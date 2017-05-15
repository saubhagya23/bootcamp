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
import {asyncAction} from '../../actions/buzz/actionsBuzz.index'
import {asyncActionUserSession} from './../../actions/user/actionsUser.index'
import { connect } from 'react-redux'
import get from 'lodash/get'
import BuzzList from './../../components/buzz/BuzzList'

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            buzzContent:'',
            category: 'Activity',
            display:false,
            id:''
        };
    }

    /*sessionMtd = () => {
        let sessionid = this.props.sessionCreate.sessionData[0];
        console.log("session id-------",sessionid);
        if(sessionid == undefined){
            console.log("time----",Date.now());
            console.log('data is not recieved yet.');
        }
        else{
            console.log("time----",Date.now());
            //var sessionid = this.props.sessionCreate.sessionData[0];
            var result = sessionid[0].googleId;
            console.log("data is recieved.");
        }
    };*/

    componentWillMount(){
        this.props.dispatch(asyncActionUserSession());
        console.log('componentWillMount----------props',this.props);
        //sessionMtd();
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

    uploadImg = (eventImg) => {
        eventImg.preventDefault();
        var filename = eventImg.target.files[0].name;
        //var filename = eventImg.target.value;
        var ext = filename.split('.').pop();
        console.log('extension is---',ext);
        if(ext == 'png'||ext == 'jpg'||ext == 'jpeg'||ext == 'gif'){
            this.setState({
                buzzImage:eventImg.target.files[0]
            });
        }
        else{
            alert('Please upload an image.');
            this.setState({
                buzzImage:''
            });
        }
    };

    createBuzz = () => {
        this.setState({
            id:this.props.sessionCreate.sessionData.googleId
        },() => {
            console.log('session id in app----------------',this.state.id);
        });

        /*var newBuzz = this.state;
        console.log('newBuzz---',newBuzz)*/
        var formData = new FormData();
        var image = formData.append('buzzImage',this.state.buzzImage);

        var newBuzz = formData.append('buzzContent',this.state.buzzContent);

       // console.log('newBuzz',newBuzz);
        console.log('buzz Image------',image);
        /*this.setState({
           display: true
        });*/
        this.state.display = true;
        console.log('new states',this.state.display);
        console.log('state being passed======',formData);
        this.props.dispatch(asyncAction(formData));
        //this.props.dispatch(asyncAction(newBuzz));

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
        console.log('user info==================',this.props);
        //console.log('session id',this.props.sessionCreate.sessionData.googleId);
        const sessionId = get(this.props.sessionCreate.sessionData, 'googleId');
        console.log('session id ----------------',sessionId);
        /*console.log("props found in Home.js",this.props);
        if(this.props.sessionCreate.loading == true){
            return(
              <div>
                  loading!!!
              </div>
            );
        }
        else {
            console.log('loaded data......');*/

            /* var sessionid = this.props.sessionCreate.sessionData[0];
             console.log("session id-------",sessionid);
             if(sessionid == undefined){
             console.log("time----",Date.now());
             console.log('data is not recieved yet.');
             }
             else{
             console.log("time----",Date.now());
             var sessionid = this.props.sessionCreate.sessionData[0];
             var result = sessionid[0].googleId;
             console.log("id is----------",result);
             console.log("data is recieved.");
             }*/
            /*var result = sessionid[0].googleId;
             console.log("id is----------",result);*/
        /*var sessionId = this.props.sessionCreate.sessionData[0];
        if(sessionId === undefined){
            /!*this.setState({
                id:null
            });*!/
            return(
                <div>
                    data not yet available
                </div>
            );
        }
        else{
            this.setState({
                id:sessionId.googleId
            });
*/

            return (
                <div>
                    <button>Log Out</button>
                    <img className="logo" src={ttnLogo}/>
                    <div className="banner-image">
                        <img className="banr" src={bgCover}/>
                        <div className="text-on-image">
                            <p>POSTING YOUR THOUGHTS</p>
                            <p>NEVER BEEN SO EASY...</p>
                        </div>
                    </div>

                    <div className="wrapper">
                        <ul className="main-menu">
                            <li><a href="#"> BUZZ <span>&#10095;</span> </a></li>
                            <li><a href="#"> COMPLAINTS <span>&#10095;</span> </a></li>
                            <li><a href="#"> RESOLVED <span>&#10095;</span> </a></li>
                        </ul>

                        <div className="sidebar-footer">
                            <p>@ 2017, To The New</p>

                            <ul className="help-menu">
                                <li><a href="#"> About </a></li>
                                <li><a href="#"> Help </a></li>
                            </ul>
                        </div>

                    </div>

                    <div className="wrapper-create-buzz">

                        <p><img src={editIcon} alt="editIcon"/>Create a Buzz</p>

                        <textarea rows="10" cols="100" placeholder="create a buzz" className="buzz-details"
                                  onChange={this.onBuzzContent.bind(this)} value={this.state.buzzContent}></textarea>

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
                              <form>
                                <input type="file" id="clickMe" accept="image/*" onChange={this.uploadImg.bind(this)}/>
                              </form>
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
                                <Route path="/home" component={BuzzList}/> : <p>no buzz available!!!</p>
                            }
                        </div>
                    </Router>

                    <p className="end"> END OF CONTENT </p>
                    {/*{this.props.sessionCreate.sessionData[0].googleId}*/}
                </div>

            )
       // }
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
