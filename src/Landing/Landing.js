import React, { Component } from 'react'
import CreateAccount from '../CreateAccount/CreateAccount'
import Login from '../Login/Login'
import AboutGame from '../AboutGame/AboutGame'
import context from '../context'

export default class Landing extends Component {
    static contextType=context;
    
    // maybe create am "about" compenent for the descriptions
    render(){
        return(
            <div>
                <AboutGame/>
                <CreateAccount/>
                <Login/>
            </div>
        )
    }
}