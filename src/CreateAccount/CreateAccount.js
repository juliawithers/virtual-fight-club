import React, { Component } from 'react'
import context from '../context'

export default class CreateAccount extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    // validate username and password creation
    sendUserData = (e) => {
        e.preventDefault();
        console.log(this.state)
        const object = {
            username: this.state.username,
            passw: this.state.password
        }
        this.context.submitUserInfo(object)
    }

    updateUsername = (e) => {
        const username = e.target.value;
        if (username.length < 4 || username.length > 12) {
            this.setState({
                message: 'Username must be getween 4 and 12 characters'
            })
        }
        this.setState({
            username: username
        })
    }

    updatePassword = (e) => {
        const password = e.target.value;
        const validateText = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(validateText)) {
            this.setState({
                message: 'Password must be getween 7 and 15 characters, and include at least one digit, and one special character'
            })
        } else {
            this.setState({
                password: password
            })
        }
    }

    render() {
        return (
            <section>
                <h2>Create your character today!</h2>
                <form onSubmit={this.sendUserData}>
                    <div>
                        <label htmlFor="username">Username(must be between 4 and 12 characters): </label>
                        <input type="text" name='username' id='username' onChange={this.updateUsername} />
                    </div>
                    <div>
                        <label htmlFor="password">Password (must be between 7 and 15 characters and include at least one digit and one special character): </label>
                        <input type="password" name='password' id='password' onChange={this.updatePassword} />
                    </div>
                    <button type='submit'>Sign Up!</button>
                </form>
            </section>
        )
    }
}