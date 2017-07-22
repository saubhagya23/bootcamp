/**
 * Created by saubhagya on 20/7/17.
 */

import React, { Component } from 'react'
import ActivityLogHeader from './core/ActivityLogHeader'
import ActivityLogRow from './core/ActivityLogRow'
import { Grid, Row, Col } from 'react-bootstrap'

class ActivityLog extends Component{
    render(){
        return(
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col md={1} lg={1} className="log-col">
                            <h4>Activity</h4>
                        </Col>
                        <Col md={2} lg={2} className="log-col">
                            <h4>Type</h4>
                        </Col>
                        <Col md={1} lg={1} className="log-col">
                            <h4>Duration</h4>
                        </Col>
                        <Col md={3} lg={3} className="log-col">
                            <h4>Description</h4>
                        </Col>
                        <Col md={1} lg={1} className="log-col">
                            <h4>Status</h4>
                        </Col>
                    </Row>
                    <ActivityLogHeader/>
                    <ActivityLogRow/>
                </Grid>
            </div>
        );
    }
}

export default ActivityLog;