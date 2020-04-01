import React, { Component } from 'react'

export default class FightProfile extends Component {

    render(){
        return(
            <section className="character">
                <h2>{this.props.character.char_name} || {this.props.wins} - {this.props.losses}</h2>
                <p>{this.props.character.current_level} - {this.props.character.current_points}}</p>
                <p>Strength: {this.props.character.strength}</p>
                <p>Intelligence: {this.props.character.intelligence}</p>
                <p>Charisma: {this.props.character.charisma}</p>
                <p>Agility: {this.props.character.agility}</p>
            </section>
        )
    }
}