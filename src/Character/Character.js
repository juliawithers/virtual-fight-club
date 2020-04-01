import React, { Component } from 'react'
import CharacterCreate from '../CharacterCreate/CharacterCreate'
import CharacterDescription from '../CharacterDescription/CharacterDescription'
import CharacterUpdate from '../CharacterUpdate/CharacterUpdate'
import context from '../context'

export default class Character extends Component {
    static contextType = context;
    state = {
        strength:[],
        intelligence:[],
        charisma:[],
        agility:[],
        character: [],
        formLogic: false
    }
    // pull from db, update context with this users information, need logic to change from false to true for character created.

    componentDidMount(){
        console.log(this.context)
        const character = this.context.characters.find(character => character.username === this.context.user.username);
        if (character.char_name.length > 0) {
            this.setState({
                strength: character.strength,
                intelligence: character.intelligence,
                charisma: character.charisma,
                agility: character.agility,
                character: character
            })
        } else if (character.char_name.length === 0){
            this.setState({
                formLogic: true
            })
        }
    }

    // need to pass a handler down to update and to create 
    // need to pass character attributes as props to description

    render(){
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
                    <CharacterDescription char={this.state.character}/>
                    <CharacterUpdate/>  
                  </section>}
                
            </div>
        )
    }
}