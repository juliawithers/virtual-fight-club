import React, { Component } from 'react';
import context from '../context';
import Fight from '../Fight/Fight';
import Landing from '../Landing/Landing';
import Character from '../Character/Character';

export default class HandleLanding extends Component {
    static contextType = context;
    render() {
        return (
            <div>
                {this.context.login === true
                    ? (this.context.character.char_name === undefined ? <Character /> : <Fight />)
                    : <Landing />
                }
            </div>
        )
    }
}