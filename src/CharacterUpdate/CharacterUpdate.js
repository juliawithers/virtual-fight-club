import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ValidateUpdate from './ValidateUpdate'
import context from '../context'

class CharacterUpdate extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            updStrength: 0,
            updIntelligence: 0,
            updCharisma: 0,
            updAgility: 0,
            attrpoints: '',
            message: '',
        }
    }

    componentDidMount() {
        
        this.setState({
            attrpoints: Number(this.context.character.attrpoints)
        })
    }

    handleErrors() {
        console.log(this.state)
        
        if(this.state.updStrength < 0){
            this.setState({
                updStrength: 0,
                updIntelligence: 0,
                updCharisma: 0,
                updAgility: 0,
                projStrength: '',
                projIntelligence: '',
                projCharisma: '',
                projAgility: '',
                message: 'Your entry must be a valid positive number'  
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
                if (elements[i].type === "number") {
                    elements[i].value = "";
                }
            }
            return true
        }
        if(this.state.updIntelligence < 0){
            this.setState({
                updStrength: 0,
                updIntelligence: 0,
                updCharisma: 0,
                updAgility: 0,
                projStrength: '',
                projIntelligence: '',
                projCharisma: '',
                projAgility: '',
                message: 'Your entry must be a valid positive number'  
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
                if (elements[i].type === "number") {
                    elements[i].value = "";
                }
            }
            return true
        }
        if(this.state.updCharisma < 0){
            this.setState({
                updStrength: 0,
                updIntelligence: 0,
                updCharisma: 0,
                updAgility: 0,
                projStrength: '',
                projIntelligence: '',
                projCharisma: '',
                projAgility: '',
                message: 'Your entry must be a valid positive number'  
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
                if (elements[i].type === "number") {
                    elements[i].value = "";
                }
            }
            return true
        }
        if(this.state.updAgility < 0){
            
            this.setState({
                updStrength: 0,
                updIntelligence: 0,
                updCharisma: 0,
                updAgility: 0,
                projStrength: '',
                projIntelligence: '',
                projCharisma: '',
                projAgility: '',
                message: 'Your entry must be a valid positive number'  
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
                if (elements[i].type === "number") {
                    elements[i].value = "";
                }
            }
            return true
        }

        const strength = Number(this.state.updStrength) + Number(this.context.character.strength);
        const intelligence = Number(this.state.updIntelligence) + Number(this.context.character.intelligence);
        const charisma = Number(this.state.updCharisma) + Number(this.context.character.charisma);
        const agility = Number(this.state.updAgility) + Number(this.context.character.agility);
        console.log(strength)
        console.log(intelligence)

        const total = Number(strength) + Number(intelligence) + Number(charisma) + Number(agility);
        console.log(total)

        const original = Number(this.context.character.strength) + Number(this.context.character.intelligence) + Number(this.context.character.charisma) + Number(this.context.character.agility);
        console.log(original)

        const diff = Number(total) - Number(original);
        console.log(diff)
        if (diff > this.state.attrpoints) {
            this.setState({
                updStrength: 0,
                updIntelligence: 0,
                updCharisma: 0,
                updAgility: 0,
                projStrength: '',
                projIntelligence: '',
                projCharisma: '',
                projAgility: '',
                message: 'Sorry, you ran out of attribute points to distribute'  
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
                if (elements[i].type === "number") {
                    elements[i].value = "";
                }
            }
            return true
        }
        if (diff < 0) {
            this.setState({
                updStrength: 0,
                updIntelligence: 0,
                updCharisma: 0,
                updAgility: 0,
                projStrength: '',
                projIntelligence: '',
                projCharisma: '',
                projAgility: '',
                message: 'Sorry, one of your inputs was negative, only positive number inputs are accepted'  
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
                if (elements[i].type === "number") {
                    elements[i].value = "";
                }
            }
            return true
        }
        return false
    }

    submitUpdatedAttributes = e => {
        e.preventDefault();
        
        const logic = this.handleErrors();
        if (logic === false) {
            const strength = Number(this.state.updStrength) + Number(this.context.character.strength);
            const intelligence = Number(this.state.updIntelligence) + Number(this.context.character.intelligence);
            const charisma = Number(this.state.updCharisma) + Number(this.context.character.charisma);
            const agility = Number(this.state.updAgility) + Number(this.context.character.agility);
            console.log(strength)
            console.log(intelligence)

            const total = Number(strength) + Number(intelligence) + Number(charisma) + Number(agility);
            console.log(total)

            const original = Number(this.context.character.strength) + Number(this.context.character.intelligence) + Number(this.context.character.charisma) + Number(this.context.character.agility);

            const diff = total - original;
    
            const newAttributepoints = Number(this.context.character.attrpoints) - diff;

            const character = {
                ...this.context.character,
                strength: strength,
                intelligence: intelligence,
                charisma: charisma,
                agility: agility,
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
                projStrength: '',
                projIntelligence: '',
                projCharisma: '',
                projAgility: '',
                message: 'Updated!'  

            })
            this.props.history.push(`/auth/${this.context.character.user_id}/character`)
        }
        
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
                updStrength: value,
                projStrength: value + Number(this.context.character.strength)
            })
        }
        else if (id === 'intelligence') {
            this.setState({
                updIntelligence: value,
                projIntelligence: value + Number(this.context.character.intelligence)
            })
        }
        else if (id === 'charisma') {
            this.setState({
                updCharisma: value,
                projCharisma: value + Number(this.context.character.charisma)
            })
        }
        else if (id === 'agility') {
            this.setState({
                updAgility: value,
                projAgility: value + Number(this.context.character.agility)
            })
        }
    }

    handleDeleteCharacter=()=>{
        this.context.deleteCharacter(this.state.character.id)
        this.setState({
            formLogic: true
        })
    }

    handleDeleteUser=()=>{
        this.context.deleteUser(this.context.user_id)
    }
    
    render() {
        const { strength, intelligence, charisma, agility } = this.state


        return (
        <div>
            <form onSubmit={this.submitUpdatedAttributes}>
                <h2>Update attributes:</h2>
                <p>Points to distrubute: {this.state.attrpoints}</p>
                <ValidateUpdate message={this.state.message} />
                <div>
                    <label htmlFor="strength">Strength: </label>
                    <input onChange={this.updateAttributes} type="number" name='strength' id='strength' value={strength} />
                    <p>Projected: {this.state.projStrength}</p>
                    <br />
                    <label htmlFor="intelligence">Intelligence: </label>
                    <input onChange={this.updateAttributes} type="number" name='intelligence' id='intelligence' value={intelligence} />
                    <p>Projected: {this.state.projIntelligence}</p>
                    <br />
                    <label htmlFor="charisma">Charisma: </label>
                    <input onChange={this.updateAttributes} type="number" name='charisma' id='charisma' value={charisma} />
                    <p>Projected: {this.state.projCharisma}</p>
                    <br />
                    <label htmlFor="agility">Agility: </label>
                    <input onChange={this.updateAttributes} type="number" name='agility' id='agility' value={agility} />
                    <p>Projected: {this.state.projAgility}</p>
                    <br />
                </div>
                <button type='submit'>UPDATE</button>
            </form>
            <button
                onClick={this.handleDeleteCharacter}
            >
                delete character?
            </button>
            <button
                onClick={this.handleDeleteUser}
            >
                delete account?
            </button>
        </div>
        )
    }
}

export default withRouter(CharacterUpdate)