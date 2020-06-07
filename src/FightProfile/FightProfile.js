import React, { Component } from 'react'

export default class FightProfile extends Component {

    render(){
        const character = this.props.character;
        return(
            <section className="character">
                <h2>{character.char_name}</h2>
                <h3> Wins: {character.wins} - Losses: {character.losses}</h3>
                <p>Current Level: {character.current_level} - Current Points: {character.current_points}</p>
                <p>Strength: {character.strength}</p>
                <p>Intelligence: {character.intelligence}</p>
                <p>Charisma: {character.charisma}</p>
                <p>Agility: {character.agility}</p>
            </section>
        )
    }
}