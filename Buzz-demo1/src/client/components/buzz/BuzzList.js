/**
 * Created by saubhagya on 9/5/17.
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import '../../../assets/css/BuzzList.css'
import image1 from './../../../assets/images/image1.jpg'
import likeIcon from './../../../assets/images/likeIcon.png'
import dislikeIcon from './../../../assets/images/dislikeIcon.png'

class BuzzList extends Component{
    constructor(props){
        super(props);
    }



    render(){
        var userMailId = this.props.sessionCreate.sessionData.email;
        var buzzTime = Date.now();
        var buzzText = this.props.buzzCreate.buzzData;
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

                                <img src={item.buzzImage} alt="Dream catcher" className="buzz-image"/>

                                <div>
                                    <img src={likeIcon} alt="Dream catcher" className="likeIcon"/>
                                    <img src={dislikeIcon} alt="Dream catcher" className="dislikeIcon"/>
                                </div>

                            </div>
                        </div>
                        )
                    )}

                    </div>


            </div>
        );
    }
}

const mapStateToProps = state => state;

const BuzzListContainer = connect(mapStateToProps)(BuzzList);
export default BuzzListContainer;
