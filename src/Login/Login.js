import React, { Component } from 'react'
import context from '../context'
import ValidateLogin from './ValidateLogin'

export default class Login extends Component {
    static contextType = context;

    state = {
        username: '',
        password: ''
    }
    // two functions to grab the inputs- change the state

    // at least onChange on both inputs
    handleChangeInput = e => {
        // determine which input was changed and update state
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'login-username') {
            this.setState({
                username: value
            })
        }
        if ( id === 'login-password') {
            this.setState({
                password: value
            })
        }
    }

    // create handler here for submission to call handleLoginSubmit
    handleSubmit = e => {
        // call the one in context and pass the info from state
        e.preventDefault();
        this.context.handleLoginSubmit(this.state.username,this.state.password)
    }

    render(){


        const { username, password } = this.state;

        return(
            <section>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="login-username">Username: </label>
                        <input onChange={this.handleChangeInput} type="text" name='login-username' id='login-username' value={username} />
                        <ValidateLogin message={this.context.usernameErr}/>
                    </div>
                    <div>
                        <label htmlFor="login-password">Password: </label>
                        <input onChange={this.handleChangeInput}type="password" name='login-password' id='login-password'
                        value={password} />
                        <ValidateLogin message={this.context.passwordErr}/>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </section>
        )
    }
}