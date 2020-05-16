import React, { Component } from 'react'

export default class CharacterDescription extends Component {
    render(){
        const character = this.props.char;
        if (!this.props.char){
            return null 
        }  
        return(
            <div>
                <h3>Attributes:</h3>
                <p>Strength: {character.strength}</p>
                <p>Intelligence: {character.intelligence}</p>
                <p>Charisma: {character.charisma}</p>
                <p>Agility: {character.agility}</p>
                <br/>
                <h3>Win-Loss Record:</h3>
                <p>{character.wins} - {character.losses}</p>
                <br/>
                <h3>Current Level and Points:</h3>
                <p>Level: {character.current_level}</p>
                <p>Current Points: {character.current_points}</p>
                <br/>
                <h3>Attribute points given at next level:</h3>
                <p>10</p>
            </div>
        )
    }
}