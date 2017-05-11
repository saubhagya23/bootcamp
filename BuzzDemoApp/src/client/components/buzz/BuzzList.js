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
        console.log('props got from home.js',this.props);
    }

    render(){
        return(
            <div className="buzz-list">
                <div className="wrapper-buzz-list">
                    <div className="header-buzz-list">
                        <h4>saubhagya.nair@tothenew.com</h4>

                        <h5>10.52pm</h5>
                    </div>

                    <div className="mid-buzz-list">
                        <h3>Yesterday lasts forever, tomorrow comes never, until you...</h3>

                        <img src={image1} alt="Dream catcher" className="buzz-image"/>

                        <div>
                            <img src={likeIcon} alt="Dream catcher" className="likeIcon"/>
                            <img src={dislikeIcon} alt="Dream catcher" className="dislikeIcon"/>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => state;

const BuzzListContainer = connect(mapStateToProps)(BuzzList);
export default BuzzListContainer;
