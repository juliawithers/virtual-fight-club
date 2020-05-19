import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ValidateUpdate from './ValidateUpdate'
import context from '../context'

class CharacterUpdate extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            updStrength: '',
            updIntelligence: '',
            updCharisma: '',
            updAgility: '',
            attrpoints: '',
            message: ''
        }
    }

    componentDidMount() {
        this.setState({
            attrpoints: Number(this.context.character.attrpoints)
        })
    }

    handleErrors() {
        const total = this.state.updStrength + this.state.updIntelligence + this.state.updCharisma + this.state.updAgility;
        const original = Number(this.context.character.strength) + Number(this.context.character.intelligence) + Number(this.context.character.charisma) + Number(this.context.character.agility);

        const diff = total - original;

        if (diff > this.state.attrpoints) {
            this.setState({
                message: 'Sorry, you ran out of attribute points to distribute'
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
        const total = this.state.updStrength + this.state.updIntelligence + this.state.updCharisma + this.state.updAgility;
     
        const original = Number(this.context.character.strength) + Number(this.context.character.intelligence) + Number(this.context.character.charisma) + Number(this.context.character.agility);
       
        const diff = total - original;
 
        const newAttributepoints = Number(this.context.character.attrpoints) - diff;

        const character = {
            ...this.context.character,
            strength: this.state.updStrength,
            intelligence: this.state.updIntelligence,
            charisma: this.state.updCharisma,
            agility: this.state.updAgility,
            attrpoints: newAttributepoints
        }
        this.setState({
            attrpoints: newAttributepoints
        })
        
        this.context.updateCharacter(character, 'attributes')
        
        var elements = document.getElementsByTagName("input");
        for (var i=0; i < elements.length; i++) {
            if (elements[i].type === "number") {
                elements[i].value = "";
            }
        }
        this.setState({
            updStrength: '',
            updIntelligence: '',
            updCharisma: '',
            updAgility: '',
            message: 'Updated!'            
        })
        this.props.history.push(`/auth/${this.context.character.user_id}/character`)
    }

    updateAttributes = e => {      
        const value = parseInt(e.target.value);     
        const id = e.target.id;

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
                <p>Points to distrubute: {this.state.attrpoints}</p>
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

export default withRouter(CharacterUpdate)