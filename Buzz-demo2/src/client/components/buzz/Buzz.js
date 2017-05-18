/**
 * Created by saubhagya on 9/5/17.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import '../../../assets/css/Buzz.css'

class Buzz extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <div class="wrapper">

                    <textarea rows="10" cols="100" placeholder="create a buzz" class="buzz-details"></textarea>

                    <div class="dropdown">
                        <button class="dropbtn" title="Select a category of your buzz">Activity &#9663;</button>
                        <div class="dropdown-content">
                            <a href="#">Activity</a>
                            <a href="#">Lost and Found</a>
                        </div>
                    </div>

                    <div class="upload">
                        <input type="image" src="upload.png" onclick="upload()"/>
                        <input type="file" id="clickMe"/>
                    </div>

                    <input type="submit" class="submit-buzz"/>

                </div>

                <p class="end"> END OF CONTENT </p>
            </div>
        );
    }
}

export default Buzz;