/**
 * Created by saubhagya on 27/4/17.
 */

import React,{ Component } from 'react'
import { render } from 'react-dom'
import  {Link} from 'react-router-dom'

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Link to="/Users">Users List</Link>
        );
    }

}