/**
 * Created by saubhagya on 29/5/17.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import './../../../assets/css/Buzz.css'
import '../../../assets/css/Home.css'
import '../../../assets/css/Resolved.css'
import ttnLogo from './../../../assets/images/ttnLogo.png';
import bgCover from './../../../assets/images/image.jpg'
import { connect } from 'react-redux'
import isAuthenticate from './../login/isAuth'
import {asyncActionResolvedComplaint} from '../../actions/complaint/actionsComplaint.index'

class Resolved extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(asyncActionResolvedComplaint(this.props.complaintCreate.offset));
    }

    render(){
        var resolvedList = this.props.complaintCreate.compData;

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
                        <li><a href="http://localhost:3000/complaint"> COMPLAINTS <span>&#10095;</span> </a></li>
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

                <div className="resolved-list">
                    <h3>Resolved Complaints</h3>
                    <div className="wrapper-resolved-list">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                            </tr>

                            {resolvedList.map((item,index) => (
                                <tr>
                                    <td>{item.compName}</td>
                                    <td>{item.compTitle}</td>
                                    <td>{item.assignedTo.email}</td>
                                    <td>{item.compStatus}</td>
                                </tr>
                                )
                            )}
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return state;
};

const ResolvedContainer = connect(mapStateToProps)(isAuthenticate(true)(Resolved));
export default ResolvedContainer;