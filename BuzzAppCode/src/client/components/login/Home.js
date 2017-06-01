/**
 * Created by saubhagya on 5/5/17.
 */

import React, { Component } from 'react';
import '../../../assets/css/Home.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ttnLogo from './../../../assets/images/ttnLogo.png';
import bgCover from './../../../assets/images/image.jpg'
import editIcon from './../../../assets/images/editIcon.png'
import './../../../assets/css/Buzz.css'
import {asyncAction, asyncActionFetch} from '../../actions/buzz/actionsBuzz.index'
import { connect } from 'react-redux'
import get from 'lodash/get'
import BuzzList from './../../components/buzz/BuzzList'
import isAuthenticate from './isAuth'

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            buzzContent:'',
            buzzImage:'',
            category: 'Activity',
            postedBy:'',
            display:false,
            id:'',
        };
    }

    componentDidMount(){
        this.props.dispatch(asyncActionFetch(this.props.buzzCreate.offset));
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

        var ext = filename.split('.').pop();

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
            id:this.props.sessionCreate
        },() => {
            console.log('session id in app----------------',this.state.id);

        });

        if(this.state.buzzContent == '' && this.state.buzzImage == ''){
            alert('content must be added to create buzz.');
        }

        this.setState({
            postedBy:this.props.sessionCreate.sessionData._id,
        });

        var formData = new FormData();
        formData.append('buzzImage',this.state.buzzImage);

        formData.append('buzzContent',this.state.buzzContent);

        formData.append('category',this.state.category);

        formData.append('postedBy',this.props.sessionCreate.sessionData._id);


        this.state.display = true;


        this.setState({
            buzzContent:'',
            buzzImage:'',
            category: 'Activity',
            postedBy:'',
        });


        this.props.dispatch(asyncAction(formData));

    };


    render(){

        const sessionId = get(this.props.sessionCreate.sessionData, 'googleId');

           let template;
            if(this.props.sessionCreate.loading){
                template =  (
                    <div>
                        Loading....
                    </div>
                )
            }else{
                template =  (
                    <div>
                        <div>
                        <a href="http://localhost:3000/logout" className="logoutButton">Log Out</a>
                        <img className="logo" src={ttnLogo}/>
                        </div>
                        <div className="banner-image">
                                <div className="d">WELCOME TO BUZZ APP</div>
                                <img className="banr" src={bgCover}/>
                                <div className="text-on-image">
                                    <p>POSTING YOUR THOUGHTS</p>
                                    <p>NEVER BEEN SO EASY...</p>
                                </div>
                        </div>

                            <div className="wrapper">
                                <ul className="main-menu">
                                    <li><a href="#"> BUZZ <span>&#10095;</span> </a></li>
                                    <li><a href="http://localhost:3000/complaint"> COMPLAINTS <span>&#10095;</span> </a></li>
                                    <li><a href="http://localhost:3000/resolved"> RESOLVED <span>&#10095;</span> </a></li>
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

                                <p><img src={editIcon} alt="editIcon"/> Create a Buzz</p>

                                <textarea rows="10" cols="100" placeholder="create a buzz" className="buzz-details" classID="contentArea"
                                          onChange={this.onBuzzContent.bind(this)} value={this.state.buzzContent}></textarea>

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


                            <Router>
                                <div>
                                        <Route path="/home" component={BuzzList}/>
                                </div>
                            </Router>

                    </div>

                );
            }
            return (<div> {template} </div>)


    }
}

const mapStateToProps = state => {
    return state;
};

const HomeContainer = connect(mapStateToProps)(isAuthenticate(true)(Home));

export default HomeContainer;


//===================================


