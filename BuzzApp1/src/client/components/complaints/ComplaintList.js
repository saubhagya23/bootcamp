/**
 * Created by saubhagya on 28/5/17.
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import '../../../assets/css/ComplaintList.css'
import {asyncActionComplaintStatus} from './../../actions/complaint/actionsComplaint.index'

class ComplaintList extends Component{
    constructor(props){
        super(props);

        this.state = {
            compStatus:'',
        }

    }

    onChangeCategory = (compId, e) => {
        console.log('------------------s',this.state.isDisabled);
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

    render(){
        var compList = this.props.complaintCreate.compData;
        console.log('$$$$$$$$$$$$$$$',this.state.isDisabled);

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
                                    <td>{item.assignedTo}</td>
                                    <td>
                                        {(this.props.sessionCreate.sessionData.role == 'user')?
                                            <p>{item.compStatus}</p>
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

const ComplaintListContainer = connect(mapStateToProps)/*(isAuthenticate*/(ComplaintList)//);
export default ComplaintListContainer;