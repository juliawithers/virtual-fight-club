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
        }
    }

    componentDidMount(){
        console.log('component mounted')
        console.log(this.context)
        const character = this.context.character
        this.setState({
            character: character,
        })
        console.log(this.state)
    }

    handleDeleteCharacter=()=>{
        console.log('handleDeleteCharacter ran')
        this.context.deleteCharacter(this.state.character.id)
        this.setState({
            formLogic: true
        })
    }

    handleDeleteUser=()=>{
        console.log('handleDeleteUser ran')
        this.context.deleteUser(this.context.user_id)
    }

    render(){ 
        return(
            <div>
                <header role="banner">
                <h1>
                    {this.context.character === undefined
                    ? 'Create your Character!'
                    : this.context.character.char_name
                    }
                    </h1>
                </header>
                {this.context.character === undefined
                ? <CharacterCreate/>
                : <section>
                    <CharacterDescription char={this.context.character}/>
                    <CharacterUpdate char={this.context.character}/>  
                  </section>}
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