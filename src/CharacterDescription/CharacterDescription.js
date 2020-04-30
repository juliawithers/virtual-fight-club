import React, { Component } from 'react'

export default class CharacterDescription extends Component {
    // passing in props "char" that includes character, wins, and losses
    render(){
        if (!this.props.char){
            return null 
        }  
        console.log(this.props)
        return(
            <div>
                <h3>Attributes:</h3>
                <p>Strength: {this.props.char.character.strength}</p>
                <p>Intelligence: {this.props.char.character.intelligence}</p>
                <p>Charisma: {this.props.char.character.charisma}</p>
                <p>Agility: {this.props.char.character.agility}</p>
                <br/>
                <h3>Win-Loss Record:</h3>
                <p>{this.props.char.wins} - {this.props.char.losses}</p>
                <br/>
                <h3>Current Level and Points:</h3>
                <p>Level: {this.props.char.character.current_level}</p>
                <p>Current Points: {this.props.char.character.current_points}</p>
                <br/>
                <h3>Points to next Level:</h3>
                <p>[next level points goal - current points]</p>
                <br/>
                <h3>Attribute points given at next level:</h3>
                <p>10</p>
            </div>
        )
    }
}