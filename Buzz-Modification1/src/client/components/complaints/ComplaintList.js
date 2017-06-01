/**
 * Created by saubhagya on 28/5/17.
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import '../../../assets/css/ComplaintList.css'
import {asyncActionComplaintStatus, asyncActionDeleteComplaint} from './../../actions/complaint/actionsComplaint.index'

class ComplaintList extends Component{
    constructor(props){
        super(props);

        this.state = {
            compStatus:'',
        }

    }

    onChangeCategory = (compId, e) => {
        var userRole = this.props.sessionCreate.sessionData.role;
        if(userRole == 'admin'){
            if(e.target.value == 'Pending'){
                this.setState({
                    compStatus:'Pending',
                });
            }
            else if(e.target.value == 'Closed'){
                this.setState({
                    compStatus:'Closed',
                },function(){
                    var changedStatus = {
                        compId: compId,
                        compStatus: this.state.compStatus
                    }
                    this.props.dispatch(asyncActionComplaintStatus(changedStatus))
                });

            }
            else
            {
                this.setState({
                    compStatus:'Resolved',
                },function(){
                   var changeStatus = {
                        compId: compId,
                       compStatus: this.state.compStatus
                    }
                    this.props.dispatch(asyncActionComplaintStatus(changeStatus))
                });
            }
        }


    };

    onDeleteComplaint = (compId) => {
        var deleteComp = {
            compId : compId
        }
        this.props.dispatch(asyncActionDeleteComplaint(deleteComp))
    }

    render(){
        var compList = this.props.complaintCreate.compData;

        return(
            <div>
                <div className="complaint-list">
                    <h3>Recent Complaints</h3>
                    <div className="wrapper-complaint-list">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                            </tr>

                            {compList.map((item,index) => (
                                <tr>
                                    <td>{item.compName}</td>
                                    <td>{item.compTitle}</td>
                                    <td>{item.assignedTo.email}</td>
                                    <td>
                                        {(this.props.sessionCreate.sessionData.role == 'user')?
                                            <p>{item.compStatus}
                                            <button onClick={this.onDeleteComplaint.bind(this,item._id)}>Delete</button></p>
                                         :
                                            <select onChange={this.onChangeCategory.bind(this,item._id)}>
                                                <option value="Pending">Pending</option>
                                                <option value="Closed">Closed</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        }
                                    </td>
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

const mapStateToProps = state => state;

const ComplaintListContainer = connect(mapStateToProps)(ComplaintList);
export default ComplaintListContainer;