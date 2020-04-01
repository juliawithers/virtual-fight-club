import React, { Component } from 'react'
import context from '../context'

export default class CreateAccount extends Component {
    static contextType = context;
    render(){
        return(
            <section>
                <h2>Create your character today!</h2>
                <form onSubmit={this.context.handleSubmitUserInfo}>
                    <div>
                    <label htmlFor="username">Username(must be between 4 and 12 characters): </label>
                    <input type="text" name='username' id='username' />
                    </div>
                    <div>
                    <label htmlFor="password">Password (must be between 6 and 10 characters and include at least one special character): </label>
                    <input type="password" name='password' id='password' />
                    </div>
                    <button type='submit'>Sign Up!</button>
                </form>
            </section>
        )
    }
}