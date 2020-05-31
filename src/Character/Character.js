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
        const character = this.context.character
        this.setState({
            character: character,
        })
    }

    render(){ 
        return(
            <div>
                <header role="banner">
                <h1>
                    {this.context.character.char_name === undefined
                    ? 'Create your Character!'
                    : this.context.character.char_name
                    }
                    </h1>
                </header>
                {this.context.character.char_name === undefined
                ? <CharacterCreate/>
                : <section>
                    <CharacterDescription char={this.context.character}/>
                    <CharacterUpdate char={this.context.character}/>  
                  </section>}
            </div>
        )
    }
}