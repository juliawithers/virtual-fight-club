import React, { Component } from 'react'
import './CharacterDescription.css'

export default class CharacterDescription extends Component {
    render() {
        const character = this.props.char;
        if (!this.props.char) {
            return null
        }
        return (
            <div className="description">
                <article className="article">
                    <div className="left">
                        <p>Wins: {character.wins}</p>
                        <p>Level: {character.current_level}</p>
                    </div>
                    <div className="right">
                        <p>Losses: {character.losses}</p>
                        <p>Points: {character.current_points}</p>
                    </div>
                </article>
                <h3>Attributes:</h3>
                <article className="article">
                    <div className="left">
                        <p>Strength: {character.strength}</p>
                        <p>Intelligence: {character.intelligence}</p>
                    </div>
                    <div className="right">
                        <p>Agility: {character.agility}</p>
                        <p>Charisma: {character.charisma}</p>
                    </div>
                </article>
                <h3>Attribute points given at next level: 10</h3>
            </div>
        )
    }
}