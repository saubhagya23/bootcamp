/**
 * Created by saubhagya on 28/5/17.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import './../../../assets/css/Complaint.css'
import { connect } from 'react-redux'
import {asyncActionCreateComplaint, asyncActionFetchComplaint} from '../../actions/complaint/actionsComplaint.index'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class PostComplaint extends Component{
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

    createComplaint = () => {
        console.log('^^^^^^^^^^^',this.state);

        this.setState({
            id:this.props.sessionCreate
        },() => {
            console.log('session id in complaint----------------',this.state.id);

        });

        if((this.state.compName == ''|| this.state.compEmail == '' || this.state.compTitle == '' ) && (this.state.compContent == '' && this.state.compImage == '')){
            alert('Please provide all essential details.');
        }

        this.setState({
            createdBy:this.props.sessionCreate.sessionData._id
        },function(){
            console.log('^^^^^^^^^^^======',this.state.createdBy);
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
        console.log('props in complaints--',this.props);
        return(
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

                <select className="dropdown" >
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
        );
    }
}

const mapStateToProps = state => state;

const PostComplaintContainer = connect(mapStateToProps)/*(isAuthenticate*/(PostComplaint)//);
export default PostComplaintContainer;