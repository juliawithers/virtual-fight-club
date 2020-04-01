import React, { Component } from 'react'

export default class CharacterDescription extends Component {
    render(){
        return(
            <div>
                <h3>Attributes:</h3>
                <p>Strength: [strength score]</p>
                <p>Intelligence: [intelligence score]</p>
                <p>Charisma:[charisma score]</p>
                <p>Agility: [agility score]</p>
                <br/>
                <h3>Win-Loss Record:</h3>
                <p>[wins] - [losses]</p>
                <br/>
                <h3>Current Level and Points:</h3>
                <p>Level: [level]</p>
                <p>Current Points: [current points]</p>
                <br/>
                <h3>Points to next Level:</h3>
                <p>[next level points goal - current points]</p>
                <br/>
                <h3>Attribute points given at next level:</h3>
                <p>[next attribute point allotment]</p>
            </div>
        )
    }
}