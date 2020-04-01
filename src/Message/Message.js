import React, { Component } from 'react'

export default class Message extends Component {
    render(){
        return(
            <div>
                <header role="banner">
                    <h1>Virtual Fight Club</h1>
                </header>
                <section>
                    <h2>Sorry!</h2>
                    <p>[error message]</p>
                    <p>[link to login/email for help]</p>
                </section>
            </div>
        )
    }
}