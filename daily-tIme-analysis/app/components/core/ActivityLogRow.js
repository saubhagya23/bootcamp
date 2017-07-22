/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import sampleData from '../assets/SampleData'
import ActivityLogComp from './ActivityLogComp'
import editIcon from '../assets/images/editIcon.png'
import deleteIcon from '../assets/images/deleteIcon.jpg'

class ActivityLogRow extends Component{
    constructor(){
        super();
        this.state = {
            activity:'',
            type:'',
            duration:'',
            description:'',
            status:'Pending',
        }
    }

    render(){
        console.log('sample data---------',sampleData);
        console.log('state in activityRow------',this.state);
        return(
            <Row className="show-grid">
                        {sampleData.map((item) => {
                            return (
                                <ActivityLogComp activity={item.Activity}
                                                 type={item.Type}
                                                 duration={item.Duration}
                                                 desc={item.Description}
                                                 status={item.Status} sampleData={sampleData}/>
                            )
                        })}
                {/*<Col md={1} lg={1} className="log-col">
                    {this.state.editBtn === 'true'?
                        <LogDropdown/>:<span>Project</span>
                    }
                </Col>
                <Col md={2} lg={2} className="log-col">
                    {this.state.editBtn === 'true'?
                        <LogDropdown/>:<span>Westcon</span>
                    }
                </Col>
                <Col md={1} lg={1} className="log-col">
                    {this.state.editBtn === 'true'?
                        <LogDropdown/>:<span>30 mins</span>
                    }
                </Col>
                <Col md={3} lg={3} className="log-col">
                    {this.state.editBtn === 'true'?
                        <input type="text"/>:<span>Sync meeting- Westcon!!!!!</span>
                    }
                </Col>*/}

            </Row>
        );
    }
}

export default ActivityLogRow;