/**
 * Created by saubhagya on 20/7/17.
 */

import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import LogDropdown from './LogDropdown'

class ActivityLogComp extends Component{
    constructor(){
        super();

        this.state = {
            editBtn:'false',
            deleteBtn: 'false',
            selectedValue: '',
            activity: '',
            type:'',
            duration:'',
            desc:'',
            status:''
        }
    }

    componentWillMount = () => {
        this.setState({
            activity: this.props.activity,
            type: this.props.type,
            duration:this.props.duration,
            desc:this.props.desc,
            status:this.props.status
        })
    }

    onEditClick = () => {
        this.setState({
            editBtn:'true'
        })
    }

    onOkClick = () => {
        this.setState({
            editBtn:'false'
        })
    }

    onEditDeleteClick = () => {
        this.setState({
            editBtn:'false'
        })
    }

    onDeleteClick = () => {
        if(this.state.deleteBtn === 'false'){
            this.setState({
                deleteBtn:'true'
            })
        }
        else{
            this.setState({
                deleteBtn:'false'
            })
        }
    }

    getSeletedValue = (selectedItem) => {
        this.setState({
            selectedValue: selectedItem
        },() => {
            console.log('value in activityLogComp------------------',this.state.selectedValue);
        })
    }

    onSelectChanged = (selected) => {

    }

    render(){
        console.log('props got=================',this.props.sampleData);
        let sampleData = this.props.sampleData;
        let activityArray = [], typeArray = [], durationArray = [];
        sampleData.forEach(function(item){
            activityArray.push(item.Activity);
            typeArray.push(item.Type);
            durationArray.push(item.Duration);
        })
        /*for(let i=0;i<sampleData.length; i++){
            console.log('*****************',sampleData[0]);
        }*/
        console.log('------------array----------------',activityArray,' ',typeArray,' ',durationArray);
        let activityCategory = ['Project','Non-Project'];
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];

        return(
            <div>
                {this.state.editBtn === 'true'?
                    <div className="data-div">
                        <Col md={1} lg={1} className="log-col">
                            <LogDropdown className='activity' data={activityCategory} selectedValue={this.getSeletedValue}/>
                        </Col>
                        <Col md={2} lg={2} className="log-col">
                            <LogDropdown className='type' data={typeArray} selectedValue={this.getSeletedValue}/>
                        </Col>
                        <Col md={1} lg={1} className="log-col">
                            <LogDropdown className="duration" data={durationTime} selectedValue={this.getSeletedValue}/>
                        </Col>
                        <Col md={3} lg={3} className="log-col">
                            <input type="text" value={this.props.desc}/>
                        </Col>
                        <Col md={1} lg={1} className="log-col">
                            <span>{this.props.status}</span>
                        </Col>
                        <Col md={2} lg={2} lgOffset={1} className="log-col">
                            {/* <button className="edit-clear-button"><img src={editIcon}/></button>
                             <button className="edit-clear-button"><img src={deleteIcon}/></button>*/}

                            <button type="button" className="btn btn-default btn-sm edit-clear-button" onClick={this.onOkClick.bind(this)}>
                                <span className="glyphicon glyphicon-ok"></span>
                            </button>
                            <button type="button" className="btn btn-default btn-sm edit-clear-button" onClick={this.onEditDeleteClick.bind(this)}>
                                <span className="glyphicon glyphicon-remove"></span>
                            </button>

                        </Col>
                    </div>:
                    <div>
                    {this.state.deleteBtn === 'false'?
                        <div className="data-div">
                            <Col md={1} lg={1} className="log-col">
                                <span>{this.props.activity}</span>
                            </Col>
                            <Col md={2} lg={2} className="log-col">
                                <span>{this.props.type}</span>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <span>{this.props.duration}</span>
                            </Col>
                            <Col md={3} lg={3} className="log-col">
                                <span>{this.props.desc}</span>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <span>{this.props.status}</span>
                            </Col>
                            <Col md={2} lg={2} lgOffset={1} className="log-col">
                                {/* <button className="edit-clear-button"><img src={editIcon}/></button>
                                 <button className="edit-clear-button"><img src={deleteIcon}/></button>*/}

                                <button type="button" className="btn btn-default btn-sm edit-clear-button" onClick={this.onEditClick.bind(this)}>
                                    <span className="glyphicon glyphicon-pencil"></span>
                                </button>
                                <button type="button" className="btn btn-default btn-sm edit-clear-button" onClick={this.onDeleteClick.bind(this)}>
                                    <span className="glyphicon glyphicon-remove"></span>
                                </button>

                            </Col>
                        </div>:''
                    }
                    </div>
                }
            </div>
        )
    }
}

export default ActivityLogComp;