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
        const total = this.state.updStrength + this.state.updIntelligence + this.state.updCharisma + this.state.updAgility;

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
            return 'no' 
        } else if (this.state.char_name === ''){
            this.setState({
                message: 'you must enter a character name'
            })
        } else {
            return 'yes'
        }
    }

    submitUpdatedAttributes = e => {
        e.preventDefault();
        console.log('submit character ran')
        const check = this.handleErrors();
        if (check === 'no') {
            return
        } else if (check === 'yes') {
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
        console.log(this.state.attrpoints)
    }

    updateAttributes = e => {
        const value = e.target.value;
        const id = e.target.id;
        console.log(this.state.attrpoints)
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