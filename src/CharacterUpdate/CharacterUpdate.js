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
            attrPoints: '',
            message: ''
        }
    }

    componentDidMount() {
        console.log(this.context.character.attrpoints)
        this.setState({
            attrPoints: Number(this.context.character.attrpoints)
        })
    }

    handleErrors() {
        const total = this.state.updStrength + this.state.updIntelligence + this.state.updCharisma + this.state.updAgility;
        if (total > this.state.attrPoints) {
            this.setState({
                message: 'Sorry, you ran out of attribute points to distribute'
            })
        }
    }

    submitUpdatedAttributes = e => {
        e.preventDefault();
        this.handleErrors();
  
        const character = {
            ...this.context.character,
            strength: this.state.updStrength,
            intelligence: this.state.updIntelligence,
            charisma: this.state.updCharisma,
            agility: this.state.updAgility
        }
        console.log(character)
        this.context.updateCharacter(character, 'attributes')
    }

    updateAttributes = e => {
        console.log(this.context)
        const value = parseInt(e.target.value);
        console.log(typeof(value))
        const id = e.target.id;
        console.log(value, id)

        if (isNaN(value)) {
            if (id === 'strength') {
                this.setState({
                    updStrength:'',
                })
            }
            if (id === 'intelligence') {
                this.setState({
                    updIntelligence: '',
                })
            }
            if (id === 'charisma') {
                this.setState({
                    updCharisma: '',
                })
            }
            if (id === 'agility') {
                this.setState({
                    updAgility: '',
                })
            }
            this.setState({
                message: 'Your entry must be a valid number' 
            })
        }
        else if (id === 'strength') {
            this.setState({
                updStrength: value + Number(this.context.character.strength),
            })
        }
        else if (id === 'intelligence') {
            this.setState({
                updIntelligence: value + Number(this.context.character.intelligence),
            })
        }
        else if (id === 'charisma') {
            this.setState({
                updCharisma: value + Number(this.context.character.charisma),
            })
        }
        else if (id === 'agility') {
            this.setState({
                updAgility: value + Number(this.context.character.agility),
            })
        }
    }

    render() {
        const { strength, intelligence, charisma, agility } = this.state
        return (
            <form onSubmit={this.submitUpdatedAttributes}>
                <h2>Update attributes:</h2>
                <p>Points to distrubute: {this.state.attrPoints}</p>
                <ValidateUpdate message={this.state.message} />
                <div>
                    <label htmlFor="strength">Strength: </label>
                    <input onChange={this.updateAttributes} type="number" name='strength' id='strength' value={strength} />
                    <p>Projected: {this.state.updStrength}</p>
                    <br />
                    <label htmlFor="intelligence">Intelligence: </label>
                    <input onChange={this.updateAttributes} type="number" name='intelligence' id='intelligence' value={intelligence} />
                    <p>Projected: {this.state.updIntelligence}</p>
                    <br />
                    <label htmlFor="charisma">Charisma: </label>
                    <input onChange={this.updateAttributes} type="number" name='charisma' id='charisma' value={charisma} />
                    <p>Projected: {this.state.updCharisma}</p>
                    <br />
                    <label htmlFor="agility">Agility: </label>
                    <input onChange={this.updateAttributes} type="number" name='agility' id='agility' value={agility} />
                    <p>Projected: {this.state.updAgility}</p>
                    <br />
                </div>
                <button type='submit'>UPDATE</button>
            </form>
        )
    }
}