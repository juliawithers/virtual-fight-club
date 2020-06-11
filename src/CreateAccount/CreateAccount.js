import React, { Component } from 'react';
import context from '../context';
import ValidateCreateAccount from './ValidateCreateAccount';

export default class CreateAccount extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
   
    handleUserInputErrors = () => {
        const username = this.state.username;
        const password = this.state.password;
        const validateText = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(validateText)) {
            this.setState({
                message: 'Password must be between 7 and 15 characters, and include at least one digit, and one special character'
            });
            return true;
        }
        if (username.length < 4 || username.length > 12) {
            this.setState({
                message: 'Username must be getween 4 and 12 characters'
            });
            return true;
        }
        return false;
    }

    sendUserData = (e) => {
        e.preventDefault();
        const check = this.handleUserInputErrors();
        if (check === false) {
            const object = {
                username: this.state.username,
                passw: this.state.password
            };
            this.context.submitUserInfo(object);
        }

    }

    updateUsername = (e) => {
        const username = e.target.value;
        this.setState({
            username: username
        });
    }

    updatePassword = (e) => {
        const password = e.target.value;
        this.setState({
            password: password
        });
    }

    render() {
        return (
            <section>
                <h2>Create your character today!</h2>
                <form onSubmit={this.sendUserData}>
                    <div>
                        <label htmlFor="username">Username(must be between 4 and 12 characters): </label>
                        <br />
                        <input className="username" type="text" name='username' id='username' onChange={this.updateUsername} />
                    </div>
                    <div>
                        <label htmlFor="password">Password (must be between 7 and 15 characters and include at least one digit and one special character): </label>
                        <br />
                        <input className="password" type="password" name='password' id='password' onChange={this.updatePassword} />
                    </div>
                    <button type='submit'>Sign Up!</button>
                    <ValidateCreateAccount message={this.state.message} />
                </form>
            </section>
        )
    }
}