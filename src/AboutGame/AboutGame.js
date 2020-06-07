import React, { Component } from 'react'
import context from '../context'

export default class AboutGame extends Component {
    static contextType = context;
    render(){
        return(
            <div>
                <header className="header" role="banner">
                    <h1>Virtual Fight Club</h1>
                </header>
                <section>
                    <h2>Character Development</h2>
                    <p>In Virtual Fight Club you can create a character and fight opponents! Get to the next level by gaining points from wins. 50 points to reach each new level. Once you reach the next level you can update the character attributes of your choosing. 10 attribute points are given at each level. Strength, Intelligence, Charisma, and Agility are the attributes you must work with. Each character is unique! </p>
                    
                    <p>And remember, the FIRST RULE OF FIGHT CLUB: You do not talk about (virtual) Fight Club!</p>
                </section>
                <section>
                    <h2>The FIGHT</h2>
                    <p>Each opponent is chosen at random and the winner is determined by an algorithm that incorporates the attribute values and random chance. Win and gain points towards your next upgrade. Lose and you won't lose anything, you just won't gain any points.</p>
                </section>
            </div>
        )
    }
}