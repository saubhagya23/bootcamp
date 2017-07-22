/**
 * Created by saubhagya on 21/7/17.
 */

import React, { Component } from 'react'

class MenuItemList extends Component{
    constructor(){
        super();

        this.state = {
            selectedItem:''
        }

    }

    onItemClick = (event) => {
        this.setState({
            selectedItem:event.target.value
        },() => {
            console.log('@@@@@@@@@@@@@@@@@@@2',this.state.selectedItem);
            this.props.onMenuItemSelect(this.state.selectedItem);
        })
    }

    render(){
        console.log('in menu-----------------------------props',this.props);
        return(
            <button className="menu-items" value={this.props.option} onClick={this.onItemClick.bind(this)}>
                {this.props.option}
            </button>
        );
    }
}

export default MenuItemList;