import React, { Component } from 'react'
import ValidateUpdate from './ValidateUpdate'
import context from '../context'

export default class CharacterUpdate extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            updStrength: '',
            updIntelligence: '',
            updCharisma: '',
            updAgility: '',
            attr_points: '',
            message: ''
        }
    }

    componentDidMount() {
        this.setState({
            attr_points: this.context.character.attr_points
        })
    }

    handleErrors() {
        if (this.state.attrPoints < 0) {
            this.setState({
                message: 'Sorry, you ran out of attribute points to distribute'
            })
        }
    }

    submitUpdatedAttributes = e => {
        e.preventDefault();
        this.handleErrors();
        // post this
        const character = {
            ...this.context.character,
            strength: this.state.updStrength,
            intelligence: this.state.updIntelligence,
            charisma: this.state.updCharisma,
            agility: this.state.updAgility
        }
        this.context.updateCharacter(character, 'attributes')
    }

    updateAttributes = e => {
        console.log(this.context)
        const value = parseInt(e.target.value);
        const id = e.target.id;
        console.log(value, id)

        if (id === 'strength') {
            this.setState({
                updStrength: value + this.context.character.strength,
                attr_points: this.state.attr_points - value
            })
        }
        if (id === 'intelligence') {

            this.setState({
                updIntelligence: value + this.context.character.intelligence,
                attr_points: this.state.attr_points - value
            })
        }
        if (id === 'charisma') {

            this.setState({
                updCharisma: value + this.context.character.charisma,
                attr_points: this.state.attr_points - value
            })
        }
        if (id === 'agility') {

            this.setState({
                updAgility: value + this.context.character.agility,
                attr_points: this.state.attr_points - value
            })
        }
    }

    render() {
        const { strength, intelligence, charisma, agility } = this.state
        return (
            <form onSubmit={this.submitUpdatedAttributes}>
                <h2>Update attributes:</h2>
                <p>10 points to distribute</p>
                <p>Points left: {this.state.attr_points}</p>
                <ValidateUpdate message={this.state.message} />
                <div>
                    <label htmlFor="strength">Strength</label>
                    <input onChange={this.updateAttributes} type="strength" name='strength' id='strength' value={strength} />
                    <p>Projected: {this.state.updStrength}</p>
                    <br />
                    <label htmlFor="intelligence">Intelligence</label>
                    <input onChange={this.updateAttributes} type="intelligence" name='intelligence' id='intelligence' value={intelligence} />
                    <p>Projected: {this.state.updIntelligence}</p>
                    <br />
                    <label htmlFor="charisma">Charisma</label>
                    <input onChange={this.updateAttributes} type="charisma" name='charisma' id='charisma' value={charisma} />
                    <p>Projected: {this.state.updCharisma}</p>
                    <br />
                    <label htmlFor="agility">Agility</label>
                    <input onChange={this.updateAttributes} type="agility" name='agility' id='agility' value={agility} />
                    <p>Projected: {this.state.updAgility}</p>
                    <br />
                </div>
                <button type='submit'>UPDATE</button>
            </form>
        )
    }
}