import React, { Component } from 'react'
import './FightProfile.css'

export default class FightProfile extends Component {
    render() {
        const character = this.props.character;
        return (
            <div>
                <h2 className="char-name">{character.char_name}</h2>
                <section className="character">
                    <div className="left-fight">
                        <h3>Wins: {character.wins}</h3>
                        <p>Current Level: {character.current_level}</p>
                        <p>Strength: {character.strength}</p>
                        <p>Intelligence: {character.intelligence}</p>
                    </div>
                    <div className="right-fight">
                        <h3>Losses: {character.losses}</h3>
                        <p>Current Points: {character.current_points}</p>
                        <p>Agility: {character.agility}</p>
                        <p>Charisma: {character.charisma}</p>
                    </div>
                </section>
            </div>
        )
    }
}