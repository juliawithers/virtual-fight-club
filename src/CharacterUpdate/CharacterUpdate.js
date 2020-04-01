import React, { Component } from 'react'

export default class CharacterCreate extends Component {
    render(){
        return(
            <form>
            <h2>Update attributes:</h2>
            <p>[Display number of points to be alloted here]</p>
            <div>
                <label htmlFor="strength">Strength</label>
                <input type="strength" name='strength' id='strength' />
                <br/>
                <label htmlFor="intelligence">Intelligence</label>
                <input type="intelligence" name='intelligence' id='intelligence' />
                <br/>
                <label htmlFor="charisma">Charisma</label>
                <input type="charisma" name='charisma' id='charisma' />
                <br/>
                <label htmlFor="agility">Agility</label>
                <input type="agility" name='agility' id='agility' />
                <br/>
            </div>
            <button type='submit'>UPDATE</button>
        </form>
        )
    }
}