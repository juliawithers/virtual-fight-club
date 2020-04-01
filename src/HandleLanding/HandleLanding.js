import React, { Component } from 'react'
import context from '../context'
import Fight from '../Fight/Fight'
import Landing from '../Landing/Landing'

export default class HandleLanding extends Component {
    static contextType=context;

    render(){
        return(
            <div>
                {this.context.login === true
                ? <Fight/>
                : <Landing/>
                }
            </div>
        )
    }
}