import React, { Component } from 'react'
import context from '../context'
import FightProfile from '../FightProfile/FightProfile'
import './Fight.css'
import config from '../config'

export default class Fight extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            character: [],
            charWins: [],
            charLosses: [],
            opponent: [],
            oppWins: [],
            oppLosses: [],
            winnerText: '',
            currentButton: 'Fight',
            char_1_id: '',
            char_2_id: '',
            winner: '',
            loser: '',
            error: ''
        }
    }

    componentDidMount() {
        const character = this.context.character;
        const wins = character.wins;
        const losses = character.losses;
        const character_level = character.current_level;

        console.log(character)
        
        // must find random characeter that is not self to fight
        // filter for all but current user
        const opponents = this.context.characters.filter(player => player.user_id !== this.context.user.id);
        const filteredOpponents = opponents.filter(char => char.current_level === character_level);
        const opponent = filteredOpponents[Math.floor(Math.random() * Math.floor(opponents.length))];

        console.log(opponent)

        const opponentWins = opponent.wins;
        const opponentLosses = opponent.losses;
        console.log(character)
        console.log(opponent)
        // setState
        this.setState({
            character: character,
            charWins: wins,
            charLosses: losses,
            opponent: opponent,
            oppWins: opponentWins,
            oppLosses: opponentLosses
        })
    }

    handleFight = (character, opponent) => {
        // this will determine the outcome of the fight
        // need to update points when done with fight, then level if we keep it
        const { strengthDiff, intelligenceDiff, charismaDiff, agilityDiff } = this.getDifference(character, opponent);
        const physicalDiffs = strengthDiff + agilityDiff;
        const mentalDiffs = intelligenceDiff + charismaDiff;

        // flip for physical or mental fight:
        const coin = this.coinFlip();
        const randomFactorUser = Math.floor((Math.random() * 5) + 1);
        const randomFactorOpp = Math.floor((Math.random() * 5) + 1);

        if (coin === 'physical') {
            let userRoll = physicalDiffs * 0.5 + mentalDiffs * 0.3 + randomFactorUser * 0.2;
            let oppRoll = physicalDiffs * 0.5 + mentalDiffs * 0.3 + randomFactorOpp * 0.2;

            if (userRoll > oppRoll) {
                // add points on server side to user
                // update wins
                // pass points, update wins/losses, record winners and losers, 
                character.current_points = character.current_points + 2;
                character.wins = character.wins + 1;
                opponent.losses = opponent.losses + 1;
                this.setState({
                    winnerText: character.char_name + ' Wins!',
                    winner: character,
                    loser: opponent,
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
            }
            else if (userRoll < oppRoll) {
                // update losses
                opponent.current_points = opponent.current_points + 2;
                opponent.wins = opponent.wins + 1;
                character.losses = character.losses + 1;
                this.setState({
                    winnerText: opponent.char_name + ' Wins!',
                    winner: opponent,
                    loser: character,
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
            }
            else if (userRoll === oppRoll) {
                this.setState({
                    winnerText: 'Tie!-no points for anyone :(',
                    winner: 'none',
                    loser: 'none',
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
            }

        }
        if (coin === 'mental') {
            let userRoll = physicalDiffs * 0.3 + mentalDiffs * 0.5 + randomFactorUser * 0.2;
            let oppRoll = physicalDiffs * 0.3 + mentalDiffs * 0.5 + randomFactorOpp * 0.2;

            console.log(userRoll, oppRoll)

            if (userRoll > oppRoll) {
                // add points on server side to user
                // update wins
                character.current_points = character.current_points + 2;
                character.wins = character.wins + 1;
                opponent.losses = opponent.losses + 1;
                this.setState({
                    winnerText: character.char_name + ' Wins!',
                    winner: character,
                    loser: opponent,
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
            }
            else if (userRoll < oppRoll) {
                // update losses
                opponent.current_points = opponent.current_points + 2;
                opponent.wins = opponent.wins + 1;
                character.losses = character.losses + 1;
                this.setState({
                    winnerText: opponent.char_name + ' Wins!',
                    winner: opponent,
                    loser: character,
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
            }
            else if (userRoll === oppRoll) {
                this.setState({
                    winnerText: 'Tie!-no points for anyone :(',
                    winner: 'none',
                    loser: 'none',
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
            }
        }
        this.setState({
            currentButton: 'Next Opponent'
        })
        

        // this should be a handler in context sent to App to update character information. 
        if (this.state.winner !== 'none') {
            this.context.updateCharacter(this.state.winner,'fight')
            this.context.updateCharacter(this.state.loser,'fight')    
        }
        
        // can update matches here, doesn't need to be in app
        const matchObject = {
            winner: this.state.winner,
            loser: this.state.loser,
            char_1_id: this.state.char_1_id,
            char_2_id: this.state.char_2_id,
            points: 2
        }
        this.updateMatches(matchObject)
    }

    updateMatches(matchObject) {
        // update matches
        fetch(config.API_MATCHES_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(matchObject),
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .catch(error => this.setState({ error }))
    }

    createNewOpponent() {
        // after fight a new opponent should be generated from "next opponent" button
        console.log(this.context)

        const opponents = this.context.characters.filter(player => player.user_id !== this.context.user.id)
        const filteredOpponents = opponents.filter(char => char.current_level === this.state.character.current_level)
        const opponent = filteredOpponents[Math.floor(Math.random() * Math.floor(opponents.length))]
        const opponentWins = opponent.wins;
        const opponentLosses = opponent.losses;
        // setState
        this.setState({
            opponent: opponent,
            oppWins: opponentWins,
            oppLosses: opponentLosses,
            currentButton: 'Fight'
        })
    }

    getDifference = (character, opponent) => {
        const strengthDiff = character.strength - opponent.strength;
        const intelligenceDiff = character.intelligence - opponent.intelligence;
        const charismaDiff = character.charisma - opponent.charisma;
        const agilityDiff = character.charisma - opponent.charisma;

        return { strengthDiff, intelligenceDiff, charismaDiff, agilityDiff }
    }

    coinFlip() {
        return (
            Math.floor((Math.random() * 2) === 0)
                ? 'pysical'
                : 'mental'
        )
    }

    handleButtonClick = type => {
        if (type === 'Fight') {
            this.handleFight(this.state.character, this.state.opponent)
        } else {
            this.createNewOpponent()
        }
    }

    render() {

        const button = this.state.currentButton === 'Fight' ?
            (<button
                onClick={() => this.handleButtonClick('Fight')}
                id="fight"
            >
                FIGHT
            </button>) : (<button
                onClick={() => this.handleButtonClick('Next Opponent')}
                id="next"
            >
                Next Opponent
            </button>);

        return (
            <div>
                <header role="banner">
                    <h1>Fight Your Opponent!</h1>
                </header>
                <FightProfile
                    character={this.state.character}
                    wins={this.state.charWins}
                    losses={this.state.charLosses} />

                <div className="winner-button-display">
                    {button}
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