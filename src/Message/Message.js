import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HandleLanding from '../HandleLanding/HandleLanding'

export default class Message extends Component {
    render(){
        return(
            <div>
                <header className="header" role="banner">
                    <h1>Virtual Fight Club</h1>
                </header>
                <section>
                    <h2>Sorry!</h2>
                    <p>You have tried to access an endpoint that you don't have access to. Please log in. Thanks!</p>
                    <Link to="/">Link to landing page</Link>
                </section>
            </div>
        )
    }
}