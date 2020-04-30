import React, { Component } from 'react'
import context from '../context'
import ValidateCreate from './ValidateCreate'

export default class CharacterCreate extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            char_name: '',
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
            attr_points: 10
        })
    }

    handleErrors() {
        if (this.state.attr_points < 0) {
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
            auth: this.context.user.auth,
            username: this.context.user.username,
            user_id: this.context.user.user_id,
            char_name: this.state.char_name,
            strength: this.state.updStrength,
            intelligence: this.state.updIntelligence,
            charisma: this.state.updCharisma,
            agility: this.state.updAgility,
            current_level: 0,
            current_points: 0,
            wins: 0,
            losses: 0,
            attr_points: this.state.attr_points
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
                updStrength: value,
                attr_points: this.state.attr_points - value
            })
        }
        if (id === 'intelligence') {

            this.setState({
                updIntelligence: value,
                attr_points: this.state.attr_points - value
            })
        }
        if (id === 'charisma') {

            this.setState({
                updCharisma: value,
                attr_points: this.state.attr_points - value
            })
        }
        if (id === 'agility') {

            this.setState({
                updAgility: value,
                attr_points: this.state.attr_points - value
            })
        }
        if (id === 'character-name') {
            this.setState({
                char_name: value
            })
        }
    }


    render() {
        const { character_name, strength, intelligence, charisma, agility } = this.state
        return (
            <form onSubmit={this.submitUpdatedAttributes}>
                <h2>Create Your Character!:</h2>
                <p>10 points to distribute</p>
                <p>Points left: {this.state.attr_points}</p>
                <ValidateCreate message={this.state.message} />
                <h2>Name your character:</h2>
                <label htmlFor="character-name">Choose character name:</label>
                <input onChange={this.updateAttributes} type="text" name="character-name" id="character-name" value={character_name} />
                <h2>Select attribute distribution:</h2>
                <div>
                    <label htmlFor="strength">Strength</label>
                    <input onChange={this.updateAttributes} type="strength" name='strength' id='strength' value={strength} />
                    <br />
                    <label htmlFor="intelligence">Intelligence</label>
                    <input onChange={this.updateAttributes} type="intelligence" name='intelligence' id='intelligence' value={intelligence} />
                    <br />
                    <label htmlFor="charisma">Charisma</label>
                    <input onChange={this.updateAttributes} type="charisma" name='charisma' id='charisma' value={charisma} />
                    <br />
                    <label htmlFor="agility">Agility</label>
                    <input onChange={this.updateAttributes} type="agility" name='agility' id='agility' value={agility} />
                    <br />
                </div>
                <button type='submit'>CREATE</button>
            </form>
        )
    }
}