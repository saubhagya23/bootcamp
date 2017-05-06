/**
 * Created by saubhagya on 5/5/17.
 */

import React, { Component } from 'react';
import image1 from './../../../src/assets/images/image1.jpg';
import ttnLogo from './../../../src/assets/images/ttnLogo.png'


class Profiles extends Component{
    render(){
        return(
            <div>
                <div className="profilesFirstDiv">
                    <button className="logoutButton">Logout</button>
                </div>
                <div>
                    <img src={ttnLogo} alt="something here too" className="logoIcon1"/>
                </div>
                <div>
                <img src={image1} alt="something here" className="upperDiv1"/>
                    <div>
                        <p className="headTextProfiles">Often unknown paths lead to beautiful destinations.</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default Profiles;