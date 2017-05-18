/**
 * Created by saubhagya on 9/5/17.
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash';
import '../../../assets/css/BuzzList.css'
//import image1 from './../../../assets/images/image1.jpg'
import likeIcon from './../../../assets/images/likeIcon.png'
import dislikeIcon from './../../../assets/images/dislikeIcon.png'
import moment from 'moment';
//import { asyncActionLikeDislike } from './../../actions/buzz/actionsBuzz.index'
//import isAuthenticate from './../login/isAuth'

class BuzzList extends Component{
    constructor(props){
        super(props);
    }

    /*onLikeDislikeButtonClick = () => {
        this.props.dispatch(asyncActionLikeDislike());
    };*/

    render(){
        var userMailId = this.props.sessionCreate.sessionData.email;

        var buzzText = this.props.buzzCreate.buzzData;

        var buzzTime = moment(buzzText.createdAt).format();
        console.log('buzzTime in buzzList-------',buzzTime);

        console.log('is buzz text array----',Array.isArray(buzzText));
        var sessionId = this.props.sessionCreate.sessionData.googleId;
        console.log('props got from home.js',this.props);

        console.log("session id in buzzlist-----------",sessionId);
        //console.log('------------------content------',buzzText[0].buzzContent);
        //console.log('buzz text-----------',Array.isArray( buzzText));
        return(
            <div>
                    <div className="buzz-list">
                    <h3>Recent Buzzes</h3>

                    {buzzText.map((item,index) => (
                        <div className="wrapper-buzz-list">
                            <div className="header-buzz-list">
                                <h4>{userMailId}</h4>

                                <h5>{buzzTime}</h5>
                            </div>

                            <div className="mid-buzz-list">
                                <h3 key={index}>{item.buzzContent}</h3>
                                <h4>{item.category}</h4>
                                {
                                    item.buzzImage?
                                        <img src={"http://localhost:3000/buzzImageFile/"+item.buzzImage} alt="Dream catcher" className="buzz-image"/>:
                                        <div></div>
                                }


                                <div>
                                    <button className="likeButton"><img src={likeIcon} alt="Dream catcher" className="likeIcon"/></button>
                                    <button className="dislikeButton"><img src={dislikeIcon} alt="Dream catcher" className="dislikeIcon"/></button>
                                </div>

                            </div>
                        </div>
                        )
                    ).reverse()}

                    </div>


            </div>
        );
    }
}

const mapStateToProps = state => state;

const BuzzListContainer = connect(mapStateToProps)/*(isAuthenticate*/(BuzzList)//);
export default BuzzListContainer;
