/**
 * Created by saubhagya on 9/5/17.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import './../../../assets/css/Buzz.css'
import './../../../assets/css/Complaint.css'
import '../../../assets/css/Home.css'
import ttnLogo from './../../../assets/images/ttnLogo.png';
import bgCover from './../../../assets/images/image.jpg'
import editIcon from './../../../assets/images/editIcon.png'
import { connect } from 'react-redux'
import isAuthenticate from './../login/isAuth'
import {asyncActionCreateComplaint, asyncActionFetchComplaint} from '../../actions/complaint/actionsComplaint.index'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ComplaintList from './ComplaintList'

class Complaints extends Component{
    constructor(props){
        super(props);
        this.state = {
            compName:'',
            compEmail:'',
            compTitle:'',
            compContent:'',
            compImage:'',
            id:'',
            category:'Hardware',
            createdBy:'',
            compStatus:'Pending'
        }
    }

    componentDidMount(){
        this.props.dispatch(asyncActionFetchComplaint(this.props.complaintCreate.offset));
    }

    onCompName = (event) => {
        event.preventDefault();
        this.setState({compName : event.target.value});
    };

    onCompEmail = (event) => {
        event.preventDefault();
        this.setState({compEmail : event.target.value});
    };

    onCompTitle = (event) => {
        event.preventDefault();
        this.setState({compTitle : event.target.value});
    };

    onCompContent = (event) => {
        event.preventDefault();
        this.setState({compContent : event.target.value});
    };

    uploadImg = (eventImg) => {
        eventImg.preventDefault();
        var filename = eventImg.target.files[0].name;

        var ext = filename.split('.').pop();

        if(ext == 'png'||ext == 'jpg'||ext == 'jpeg'||ext == 'gif'){
            this.setState({
                compImage:eventImg.target.files[0]
            });
        }
        else{
            alert('Please upload an image file.');
            this.setState({
                compImage:''
            });
        }
    };

    onChangeCategory = (e) => {
        if(e.target.value == 'Hardware'){
            this.setState({
                category:'Hardware'
            });
        }
        else if(e.target.value == 'Software'){
            this.setState({
                category:'Software'
            });
        }
        else
        {
            this.setState({
                category:'Infrastructure'
            });
        }

    };

    createComplaint = () => {

        this.setState({
            id:this.props.sessionCreate
        });

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(this.state.compEmail) == false)
        {
            alert('Invalid Email Address');
            return false;
        }
        else {
            this.setState({compEmail: this.state.compEmail});
        }

        if((this.state.compName == ''|| this.state.compEmail == '' || this.state.compTitle == '' ) || (this.state.compContent == '' && this.state.compImage == '')){
            alert('Please provide all essential details.');
            return false;
        }

        if(this.state.compName == 'null' || this.state.compTitle == 'null'){
            alert('Username or title given as "null".');
            return false;
        }
        else{
            this.setState({
                compName:this.state.compName,
                compTitle:this.state.compTitle
            })
        }

        this.setState({
            createdBy:this.props.sessionCreate.sessionData._id
        });

        var formData = new FormData();
        formData.append('compImage',this.state.compImage);

        formData.append('compName',this.state.compName);

        formData.append('compEmail',this.state.compEmail);

        formData.append('compTitle',this.state.compTitle);

        formData.append('compContent',this.state.compContent);

        formData.append('category',this.state.category);

        formData.append('compStatus',this.state.compStatus);

        formData.append('createdBy',this.props.sessionCreate.sessionData._id);


        this.state.display = true;


        this.setState({
            compName:'',
            compEmail:'',
            compTitle:'',
            compContent:'',
            compImage:'',
            category:'Hardware',
            createdBy:'',
            compStatus: 'Pending'
        });


        this.props.dispatch(asyncActionCreateComplaint(formData));

    };

    render(){

        return(
            <div>
                <a href="http://localhost:3000/logout" className="logoutButton">Log Out</a>
                <img className="logo" src={ttnLogo}/>
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
                        <li><a href="http://localhost:3000/home"> BUZZ <span>&#10095;</span> </a></li>
                        <li><a href="#"> COMPLAINTS <span>&#10095;</span> </a></li>
                        <li><a href="http://localhost:3000/resolve"> RESOLVED <span>&#10095;</span> </a></li>
                    </ul>

                    <div className="sidebar-footer">
                        <p>@ 2017, To The New</p>

                        <ul className="help-menu">
                            <li><a href="#"> About </a></li>
                            <li><a href="#"> Help </a></li>
                        </ul>
                    </div>

                </div>

                <div className="wrapper-create-complaint">

                    <p><img src={editIcon} alt="editIcon"/>Create complaint</p>

                    <textarea rows="1" cols="50" placeholder="name" className="complaint-name"
                              onChange={this.onCompName.bind(this)} value={this.state.compName}>

                    </textarea>

                    <textarea rows="1" cols="50" placeholder="email" className="complaint-email"
                              onChange={this.onCompEmail.bind(this)} value={this.state.compEmail}>

                    </textarea>

                    <textarea rows="1" cols="100" placeholder="title" className="complaint-details"
                              onChange={this.onCompTitle.bind(this)} value={this.state.compTitle}>

                    </textarea>

                    <textarea rows="10" cols="100" placeholder="write your grievances." className="complaint-details" classID="contentArea"
                              onChange={this.onCompContent.bind(this)} value={this.state.compContent}>

                    </textarea>

                    <select className="dropdown" onChange={this.onChangeCategory.bind(this)}>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Infrastructure">Infrastructure</option>
                    </select>

                    <div className="upload">
                        <form>
                            <input type="file" id="clickMe" accept="image/*" onChange={this.uploadImg.bind(this)}/>
                        </form>
                    </div>

                    <input type="submit" className="submit-complaint" onClick={this.createComplaint.bind(this)}/>

                </div>
                <Router>
                    <div>
                        <Route path="/complaints" component={ComplaintList}/>
                    </div>
                </Router>

            </div>

        );
    }
}



const mapStateToProps = state => {
    return state;
};

const ComplaintContainer = connect(mapStateToProps)(isAuthenticate(true)(Complaints));
export default ComplaintContainer;
