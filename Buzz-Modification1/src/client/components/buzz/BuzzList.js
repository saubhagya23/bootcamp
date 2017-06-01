/**
 * Created by saubhagya on 9/5/17.
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import '../../../assets/css/BuzzList.css'
import likeIcon from './../../../assets/images/likeIcon.png'
import dislikeIcon from './../../../assets/images/dislikeIcon.png'
import deleteIcon from './../../../assets/images/deleteIcon.png'
import moment from 'moment';
import { asyncActionLikeDislike, asyncActionComment, asyncActionDelete ,asyncActionFetch} from './../../actions/buzz/actionsBuzz.index'


class BuzzList extends Component{
    constructor(props){
        super(props);

        this.state=({
            likes: 0,
            buzzComment:'',
            limit: 50,
            seeMore: false,
            link:'see more'
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

        var r = confirm("Are you sure you want to delete the post?");
        if (r == true) {
            this.props.dispatch(asyncActionDelete(deleteInfo));
        } else {
            return false;
        }

    }

    onLazyLoading = () => {
        this.props.dispatch(asyncActionFetch(this.props.buzzCreate.offset));
    }

    seeMore = ()=> {
        if(this.state.link == 'see more'){
            this.setState({seeMore: true})
            this.setState({
                link:'see less'
            })
        }
        else{
            this.setState({
                link:'see more',
                seeMore:false
            })
        }

    }


    render(){


        var buzzText = this.props.buzzCreate.buzzData;



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
                                <img src={item.postedBy.userImage} alt="userImg" className="user-image"/>
                                <h4>{item.postedBy.userName}</h4>

                                <h5>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h5>
                                <h3 className="category">{item.category}</h3>
                            </div>

                            <div className="mid-buzz-list">
                                <h3 key={index}>{(item.buzzContent.length > this.state.limit)?
                                    <span>
                                        { this.state.seeMore ? item.buzzContent : item.buzzContent.slice(0,this.state.limit)}
                                        <a  onClick={this.seeMore.bind(this)} className="see-more">{this.state.link}</a>
                                    </span>:
                                    item.buzzContent}
                                </h3>

                                {
                                    item.buzzImage?
                                        <img src={"http://localhost:3000/buzzImageFile/"+item.buzzImage} alt="Dream catcher" className="buzz-image"/>:
                                        <div></div>
                                }


                                <div>
                                    <button className="likeButton" onClick={this.onLikeDislikeButtonClick.bind(this,item._id,sessionId,'like')}><img src={likeIcon} alt="Dream catcher" className="likeIcon"/></button>{item.like.length}
                                    <button className="dislikeButton" onClick={this.onLikeDislikeButtonClick.bind(this,item._id,sessionId,'dislike')}><img src={dislikeIcon} alt="Dream catcher" className="dislikeIcon"/></button>{item.dislike.length}
                                    <div className="comment">
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

                                <div>
                                    <getDeleteBtn sID={sessionId} pID={item.postedBy}>
                                        <button  className="delete-post" onClick={this.onDeleteButtonClick.bind(this,item.postedBy,item._id)}><img src={deleteIcon} alt="deletePost" className="deleteIcon"/></button>
                                    </getDeleteBtn>
                                </div>

                            </div>
                        </div>
                        )
                    )}

                        <button className="buzz-list-next" onClick={this.onLazyLoading.bind(this)}>Next</button>                    </div>




            </div>
        );
    }
}

const mapStateToProps = state => state;

const BuzzListContainer = connect(mapStateToProps)(BuzzList);
export default BuzzListContainer;

