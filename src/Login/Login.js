import React, { Component } from 'react';
import context from '../context';
import ValidateLogin from './ValidateLogin';

export default class Login extends Component {
    static contextType = context;

    state = {
        username: '',
        password: ''
    };

    handleChangeInput = e => {
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'login-username') {
            this.setState({
                username: value
            });
        }
        if (id === 'login-password') {
            this.setState({
                password: value
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.context.handleLoginSubmit(this.state.username, this.state.password);
    }
 
    render() {
        const { username, password } = this.state;
        return (
            <section>
                <h2>Login</h2>
                <p>Please use username: UseThisUser and password: hello123! to login as a grader</p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="login-username">Username: </label>
                        <input className="login-username" onChange={this.handleChangeInput} type="text" name='login-username' id='login-username' value={username} />
                    </div>
                    <div>
                        <label htmlFor="login-password">Password: </label>
                        <input className="login-password" onChange={this.handleChangeInput} type="password" name='login-password' id='login-password'
                        value={password} />
                    </div>
                    <ValidateLogin message={this.context.loginError} />
                    <button type='submit'>Login</button>
                </form>
            </section>
        )
    }
}