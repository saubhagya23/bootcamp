/**
 * Created by saubhagya on 25/5/17.
 */

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'

class Comment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {this.props.buzzCreate.buzzData.buzzComment}
            </div>
        );
    }
}