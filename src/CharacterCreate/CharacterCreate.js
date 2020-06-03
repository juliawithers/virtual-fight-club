import React, { Component } from 'react'
import context from '../context'
import ValidateCreate from './ValidateCreate'

export default class CharacterCreate extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            char_name: '',
            updStrength: 0,
            updIntelligence: 0,
            updCharisma: 0,
            updAgility: 0,
            attrpoints: '',
            message: ''
        }
    }

    componentDidMount() {
        this.setState({
            attrpoints: 10
        })
    }

    handleErrors() {
        if(this.state.updStrength < 0){
            this.setState({
                updStrength: '',
                updIntelligence: '',
                updCharisma: '',
                updAgility: '',
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
                updStrength: '',
                updIntelligence: '',
                updCharisma: '',
                updAgility: '',
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
                updStrength: '',
                updIntelligence: '',
                updCharisma: '',
                updAgility: '',
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
                updStrength: '',
                updIntelligence: '',
                updCharisma: '',
                updAgility: '',
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

        const total = Number(this.state.updStrength) + Number(this.state.updIntelligence) + Number(this.state.updCharisma) + Number(this.state.updAgility);

        if (total > 10) {
            this.setState({
                message: 'Sorry, you ran out of attribute points to distribute',
                updStrength: '',
                updIntelligence: '',
                updCharisma: '',
                updAgility: '',
                attrpoints: 10,
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
                if (elements[i].type === "text") {
                    elements[i].value = "";
                }
            }
            return true 
        } else if (this.state.char_name === ''){
            this.setState({
                message: 'you must enter a character name'
            })
            return true
        } 
        if (total < 0) {
            this.setState({
                updStrength: '',
                updIntelligence: '',
                updCharisma: '',
                updAgility: '',
                message: 'Sorry, one of your inputs was negative, only positive number inputs are accepted'  
            })
            var elements = document.getElementsByTagName("input");
            for (var i=0; i < elements.length; i++) {
                if (elements[i].type === "number") {
                    elements[i].value = "";
                }
            }
            return true
        }else {
            return false
        }
    }

    submitUpdatedAttributes = e => {
        e.preventDefault();
        const check = this.handleErrors();
        if (check === true) {
            return
        } else if (check === false) {
            const strength = Number(this.state.updStrength);
            const intelligence = Number(this.state.updIntelligence);
            const charisma = Number(this.state.updCharisma);
            const agility = Number(this.state.updAgility);
            console.log(strength)
            console.log(intelligence)

            const total = Number(strength) + Number(intelligence) + Number(charisma) + Number(agility);
            console.log(total)
    
            const newAttributepoints = Number(this.context.character.attrpoints) - total;
            const character = {
                auth: this.context.auth,
                username: this.context.username,
                user_id: this.context.user_id,
                char_name: this.state.char_name,
                strength: strength,
                intelligence: intelligence,
                charisma: charisma,
                agility: agility,
                current_level: 0,
                current_points: 0,
                wins: 0,
                losses: 0,
                attrpoints: newAttributepoints
            }
            this.context.createCharacter(character);    
        }
    }

    updateAttributes = e => {
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'strength') {
            if (value === '') {
                this.setState({
                    updStrength: 0,
                })    
            } else {
                this.setState({
                    updStrength: parseInt(value)
                })
            } 
        }
        if (id === 'intelligence') {
            if (value === '') {
                this.setState({
                    updIntelligence: 0,
                })
            } else {
                this.setState({
                    updIntelligence: parseInt(value),
                })    
            }  
        }
        if (id === 'charisma') {
            if (value === '') {
                this.setState({
                    updCharisma: 0,
                })    
            } else {
                this.setState({
                    updCharisma: parseInt(value),
                })    
            }
        }
        if (id === 'agility') {
            if (value === '') {
                this.setState({
                    updAgility: 0,
                })    
            } else {
                this.setState({
                    updAgility: parseInt(value),
                })    
            }   
        }
        if (id === 'character-name') {
            this.setState({
                char_name: value
            })
        }
        this.setState({
            message: ''
        })
    }

    handleDeleteUser=()=>{
        this.context.deleteUser(this.context.user_id)
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
                <input onChange={this.updateAttributes} type="name" name="character-name" id="character-name" value={character_name} />
                <h2>Select attribute distribution:</h2>
                {/* <p>Please fill out all attributes, otherwise your character will not be created.</p> */}
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
                <button
                    onClick={this.handleDeleteUser}
                >
                    delete account?
                </button>
            </form>
        )
    }
}