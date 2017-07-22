/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

class ActivityLogHeader extends Component{
    render(){
        return(
               <Row className="show-grid">
                   <Col md={2} lg={2} className="log-col">
                       <span className="log-date-day">Today</span>
                       <span className="log-date-day">thu</span>
                   </Col>
                   <Col md={4} lg={4} lgOffset={6} className="log-col">
                       <button className="log-clear-button">Log Time</button>
                       <button className="log-clear-button">Clear</button>
                   </Col>
               </Row>
        );
    }
}

export default ActivityLogHeader