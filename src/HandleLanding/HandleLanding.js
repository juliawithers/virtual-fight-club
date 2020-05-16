import React, { Component } from 'react'
import context from '../context'
import Fight from '../Fight/Fight'
import Landing from '../Landing/Landing'
import Character from '../Character/Character'
export default class HandleLanding extends Component {
    static contextType=context;
    
    render(){
        console.log(this.context.login)
        console.log(this.context.character)
    
        return(
            <div>
                {this.context.login === true
                ? (this.context.character === undefined ? <Character/> : <Fight/>)
                : <Landing/>
                }
            </div>
        )
    }
}