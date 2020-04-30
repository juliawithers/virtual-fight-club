import React, { Component } from 'react'
import CharacterCreate from '../CharacterCreate/CharacterCreate'
import CharacterDescription from '../CharacterDescription/CharacterDescription'
import CharacterUpdate from '../CharacterUpdate/CharacterUpdate'
import context from '../context'

export default class Character extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            character: [],
            formLogic: false,
            wins: '',
            losses: ''
        }
    }
    
    // pull from db, update context with this users information, need logic to change from false to true for character created.

    componentDidMount(){
        console.log('component mounted')
        console.log(this.context)
        const character = this.context.characters.find(character => character.user_id === this.context.user_id);
        
        const wins = character.wins;
        const losses = character.losses;

        if (character.char_name.length > 0) {
            this.setState({
                character: character,
                wins: wins,
                losses: losses
            })
        } else if (character.char_name.length === 0){
            this.setState({
                formLogic: true
            })
        }
        console.log(this.state)
    }

    // need to pass a handler down to update and to create 
    // need to pass character attributes as props to description

    render(){
        console.log(this.state)
        if (!this.state.character){
            return null 
        }  
        return(
            <div>
                <header role="banner">
                <h1>
                    {this.state.formLogic === true
                    ? 'Create your Character!'
                    : this.state.character.char_name
                    }
                    </h1>
                </header>
                
                {this.state.formLogic === true
                ? <CharacterCreate/>
                : <section>
                    <CharacterDescription char={this.state}/>
                    <CharacterUpdate char={this.state}/>  
                  </section>}
                
            </div>
        )
    }
}