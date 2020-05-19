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
            attrpoints: '',
            message: ''
        }
    }

    componentDidMount() {
        console.log('character create componentDidMount Ran')
        this.setState({
            attrpoints: 10
        })
    }

    handleErrors() {
        if (this.state.attrpoints < 0) {
            this.setState({
                message: 'Sorry, you ran out of attribute points to distribute',
                updStrength: '',
                updIntelligence: '',
                updCharisma: '',
                updAgility: '',
                attrpoints: this.context.attrpoints,
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
            if (elements[i].type === "text") {
                elements[i].value = "";
            }
            }
        }
    }

    submitUpdatedAttributes = e => {
        e.preventDefault();
        this.handleErrors();
        console.log('submit character ran')
    
        const character = {
            auth: this.context.auth,
            username: this.context.username,
            user_id: this.context.user_id,
            char_name: this.state.char_name,
            strength: this.state.updStrength,
            intelligence: this.state.updIntelligence,
            charisma: this.state.updCharisma,
            agility: this.state.updAgility,
            current_level: 0,
            current_points: 0,
            wins: 0,
            losses: 0,
            attrpoints: this.state.attrpoints
        }
        this.context.createCharacter(character);
    }

    updateAttributes = e => {
        const value = e.target.value;
        const id = e.target.id;

        if (id === 'strength') {
            this.setState({
                updStrength: parseInt(value),
                attrpoints: this.state.attrpoints - parseInt(value)
            })
        }
        if (id === 'intelligence') {
            this.setState({
                updIntelligence: parseInt(value),
                attrpoints: this.state.attrpoints - parseInt(value)
            })
        }
        if (id === 'charisma') {
            this.setState({
                updCharisma: parseInt(value),
                attrpoints: this.state.attrpoints - parseInt(value)
            })
        }
        if (id === 'agility') {
            this.setState({
                updAgility: parseInt(value),
                attrpoints: this.state.attrpoints - parseInt(value)
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
                <ValidateCreate message={this.state.message} />
                <h2>Name your character:</h2>
                <label htmlFor="character-name">Choose character name:</label>
                <input onChange={this.updateAttributes} type="text" name="character-name" id="character-name" value={character_name} />
                <h2>Select attribute distribution:</h2>
                <div>
                    <label htmlFor="strength">Strength</label>
                    <input onChange={this.updateAttributes} type="text" name='strength' id='strength' value={strength} />
                    <br />
                    <label htmlFor="intelligence">Intelligence</label>
                    <input onChange={this.updateAttributes} type="text" name='intelligence' id='intelligence' value={intelligence} />
                    <br />
                    <label htmlFor="charisma">Charisma</label>
                    <input onChange={this.updateAttributes} type="text" name='charisma' id='charisma' value={charisma} />
                    <br />
                    <label htmlFor="agility">Agility</label>
                    <input onChange={this.updateAttributes} type="text" name='agility' id='agility' value={agility} />
                    <br />
                </div>
                <button type='submit'>CREATE</button>
            </form>
        )
    }
}