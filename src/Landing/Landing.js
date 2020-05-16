import React, { Component } from 'react'
import CreateAccount from '../CreateAccount/CreateAccount'
import Login from '../Login/Login'
import AboutGame from '../AboutGame/AboutGame'
import context from '../context'


export default class Landing extends Component {
    static contextType=context;
    
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