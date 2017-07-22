import React, { Component } from 'react';
import ActivityLogHeader from '../components/core/ActivityLogHeader'
import ActivityLog from '../components/ActivityLog'

class Main extends Component {

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">

                            <ActivityLog/>

                    </div>
                </div>
            </div>
        )
    }

}

export default Main