/**
 * Created by saubhagya on 9/5/17.
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import '../../../assets/css/BuzzList.css'
import likeIcon from './../../../assets/images/likeIcon.png'
import dislikeIcon from './../../../assets/images/dislikeIcon.png'
import moment from 'moment';
import { asyncActionLikeDislike, asyncActionComment, asyncActionDelete } from './../../actions/buzz/actionsBuzz.index'


class BuzzList extends Component{
    constructor(props){
        super(props);

        this.state=({
            likes: 0,
            buzzComment:'',
        })
    }

    onBuzzComment = (event) => {
        event.preventDefault();
        this.setState({buzzComment : event.target.value});
    };

    createComment = (buzzId,userId) => {
        if(this.state.buzzComment == '' ){
            alert('comment must have some content...');
        }
        var commentSend = {
            postId : buzzId,
            userId : userId,
            commentData : this.state.buzzComment,
        }
        this.props.dispatch(asyncActionComment(commentSend));
        this.setState({
            buzzComment:''
        });
    }

    onLikeDislikeButtonClick = (buzzId,userId,like) => {
        var buzzSend = {
            post_id: buzzId,
            user_id: userId,
            like: like
        };
        this.props.dispatch(asyncActionLikeDislike(buzzSend));


    };

    onDeleteButtonClick = (userId,buzzId) => {
        var deleteInfo = {
            userID : userId,
            postID : buzzId
        };
        this.props.dispatch(asyncActionDelete(deleteInfo));
    }


    render(){
        console.log('props in buzzlist.js',this.props);
        var userMailId = this.props.sessionCreate.sessionData.email;

        var buzzText = this.props.buzzCreate.buzzData;

        var buzzTime = moment(buzzText.createdAt).format();

        var sessionId = this.props.sessionCreate.sessionData.googleId;

        var getDeleteBtn = (sID,pID) => {
            if(sID == sessionId){
               button = <button onClick={this.onDeleteButtonClick.bind(this,sID,pID)}>Delete</button>
                return button;
            }
        }


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
                                    <getDeleteBtn sID={sessionId} pID={item.postedBy}>
                                        <button  onClick={this.onDeleteButtonClick.bind(this,item.postedBy,item._id)}>Delete Post</button>
                                    </getDeleteBtn>
                                </div>


                                <div>
                                    <button className="likeButton" onClick={this.onLikeDislikeButtonClick.bind(this,item._id,sessionId,'like')}><img src={likeIcon} alt="Dream catcher" className="likeIcon"/></button>{item.like.length}
                                    <button className="dislikeButton" onClick={this.onLikeDislikeButtonClick.bind(this,item._id,sessionId,'dislike')}><img src={dislikeIcon} alt="Dream catcher" className="dislikeIcon"/></button>{item.dislike.length}
                                    <div className="comment">
                                        <p>Comment</p>
                                        {item.comments.map((comment) => (
                                            <div>
                                                {comment.commentData}
                                            </div>
                                            )
                                            )}

                                        <textarea rows="1" cols="10" placeholder="create a comment" onChange={this.onBuzzComment.bind(this)} value={this.state.buzzComment}></textarea>
                                        <button onClick={this.createComment.bind(this,item._id,sessionId)}>Post Comment</button>
                                    </div>
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

const BuzzListContainer = connect(mapStateToProps)/*(isAuthenticate*/(BuzzList)//);
export default BuzzListContainer;

