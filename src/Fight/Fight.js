import React, { Component } from 'react'
import context from '../context'
import FightProfile from '../FightProfile/FightProfile'
import './Fight.css'
export default class Fight extends Component {
    static contextType = context;
    constructor(props){
        super(props);
        this.state={
            character: [],
            charWins: [],
            charLosses: [],
            opponent: [],
            oppWins: [],
            oppLosses: [],
            winner:'',
        }
    }
    
    componentDidMount(){
        
        // we have curent user, need to get character data on characters using context (user)
        // use matches to calculate win loss and points using user
        const wins = this.context.matches.filter(match=>match.winner === this.context.user.username);
        const totalWins = wins.length;
        const losses = this.context.matches.filter(match=>match.loser === this.context.user.username);
        const totalLosses = losses.length;

        const character = this.context.characters.find(character => character.username === this.context.user.username);

        // must find random characeter that is not self to fight
        // filter for all but current user
        const opponents = this.context.characters.filter(character => character.username !== this.context.user.username)
        const opponent = opponents[Math.floor(Math.random()*Math.floor(opponents.length))]

        const opponentWins = this.context.matches.filter(match=>match.winner === opponent.username);
        const totalOppWins = opponentWins.length;
        const opponentLosses = this.context.matches.filter(match=>match.loser === opponent.username);
        const totalOppLosses = opponentLosses.length;

        // setState
        this.setState({
            character: character,
            charWins: totalWins,
            charLosses: totalLosses,
            opponent: opponent,
            oppWins: totalOppWins,
            oppLosses: totalOppLosses
        })
    }
    
    handleFight=(character,opponent)=>{
        // this will determine the outcome of the fight
        // how can we create the algorithm
        // need to update points when done with fight, then level if we keep it
        const {strengthDiff, intelligenceDiff, charismaDiff, agilityDiff} = this.getDifference(character,opponent);
        const physicalDiffs = strengthDiff + agilityDiff;
        const mentalDiffs = intelligenceDiff + charismaDiff;
        
        // flip for physical or mental fight:
        const coin = this.coinFlip();
        const randomFactorUser = Math.floor((Math.random()*5) +1);
        const randomFactorOpp = Math.floor((Math.random()*5) +1);

        if (coin === 'physical') {
            let userRoll = physicalDiffs*0.5 + mentalDiffs*0.3 + randomFactorUser*0.2;
            let oppRoll = physicalDiffs*0.5 + mentalDiffs*0.3 + randomFactorOpp*0.2;

            console.log(userRoll, oppRoll)

            if (userRoll > oppRoll) {
                // add points on server side to user
                // update wins
                this.setState({
                    winner: character.username+' Wins!'
                })
            }
            else if (userRoll < oppRoll) {
                // update losses
                this.setState({
                    winner: opponent.username+' Wins!'
                })
            }
            else if (userRoll === oppRoll) {
                this.setState({
                    winner: 'Tie!-no points for anyone :('
                })
            }

        }
        if (coin === 'mental') {
            let userRoll = physicalDiffs*0.3 + mentalDiffs*0.5 + randomFactorUser*0.2;
            let oppRoll = physicalDiffs*0.3 + mentalDiffs*0.5 + randomFactorOpp*0.2;

            console.log(userRoll, oppRoll)

            if (userRoll > oppRoll) {
                // add points on server side to user
                // update wins
                this.setState({
                    winner: character.char_name+' Wins!'
                })
            }
            else if (userRoll < oppRoll) {
                // update losses
                this.setState({
                    winner: opponent.char_name+' Wins!'
                })
            }
            else if (userRoll === oppRoll) {
                this.setState({
                    winner: 'Tie!-no points for anyone :('
                })
            }
        }

    }

    coinFlip(){
        return (
            Math.floor((Math.random()*2)===0)
            ? 'pysical' 
            : 'mental'
        )
    }

    getDifference=(character,opponent)=>{
        const strengthDiff= character.strength - opponent.strength;
        const intelligenceDiff = character.intelligence - opponent.intelligence;
        const charismaDiff = character.charisma - opponent.charisma;
        const agilityDiff = character.charisma - opponent.charisma;

        return {strengthDiff, intelligenceDiff, charismaDiff, agilityDiff}
    }


    render(){
        
        return(
            <div>
                <header role="banner">
                    <h1>Fight Your Opponent!</h1>
                </header>
                <FightProfile 
                    character={this.state.character} 
                    wins={this.state.charWins} 
                    losses={this.state.charLosses}/>
                <div className="winner-button-display">
                    <button onClick={()=>this.handleFight(this.state.character, this.state.opponent)}>
                        FIGHT
                    </button> 
                    <p>{this.state.winner}</p>   
                </div>
                <FightProfile 
                    character={this.state.opponent}
                    wins={this.state.oppWins}
                    losses={this.state.oppLosses}
                    />
            </div>
        )
    }
}