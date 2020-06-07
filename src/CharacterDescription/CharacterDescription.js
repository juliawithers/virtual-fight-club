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
                        <h3>Wins: {character.wins}</h3>
                        <h3>Current Level: {character.current_level}</h3>
                    </div>
                    <div className="right">
                        <h3>Losses: {character.losses}</h3>
                        <h3>Current Points: {character.current_points}</h3>
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