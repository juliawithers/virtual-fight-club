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
            opponent: [],
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
        const opponent = this.context.createNewOpponent(this.context.characters, this.context.character.user_id)

        this.setState({
            character: character,
            opponent: opponent,
        })
    }

    handleFight = (character, opponent) => {
        const { strengthDiff, intelligenceDiff, charismaDiff, agilityDiff } = this.getDifference(character, opponent);
        const physicalDiffs = strengthDiff + agilityDiff;
        const mentalDiffs = intelligenceDiff + charismaDiff;

        const coin = this.coinFlip();
        const randomFactorUser = Math.floor((Math.random() * 5) + 1);
        const randomFactorOpp = Math.floor((Math.random() * 5) + 1);

        if (coin === 'physical') {
            let userRoll = physicalDiffs * 0.5 + mentalDiffs * 0.3 + randomFactorUser * 0.2;
            let oppRoll = physicalDiffs * 0.5 + mentalDiffs * 0.3 + randomFactorOpp * 0.2;

            if (userRoll > oppRoll) {
                character.current_points = Number(character.current_points) + 2;
                character.wins = Number(character.wins) + 1;
                opponent.losses = Number(opponent.losses) + 1;
                this.setState({
                    winnerText: character.char_name + ' Wins!',
                    winner: character,
                    loser: opponent,
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
                this.context.updateCharacter(character, 'fight')
                this.context.updateCharacter(opponent, 'fight')
                const matchObject = {
                    winner: character.char_name,
                    loser: opponent.char_name,
                    char_1_id: character.id,
                    char_2_id: opponent.id,
                    points: 2
                }
                this.updateMatches(matchObject)
            }
            else if (userRoll < oppRoll) {
                // update losses
                opponent.current_points = Number(opponent.current_points) + 2;
                opponent.wins = Number(opponent.wins) + 1;
                character.losses = Number(character.losses) + 1;
                this.setState({
                    winnerText: opponent.char_name + ' Wins!',
                    winner: opponent,
                    loser: character,
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
                this.context.updateCharacter(character, 'fight')
                this.context.updateCharacter(opponent, 'fight')
                const matchObject = {
                    winner: opponent.char_name,
                    loser: character.char_name,
                    char_1_id: character.id,
                    char_2_id: opponent.id,
                    points: 2
                }
                this.updateMatches(matchObject)
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

            if (userRoll > oppRoll) {
                character.current_points = Number(character.current_points) + 2;
                character.wins = Number(character.wins) + 1;
                opponent.losses = Number(opponent.losses) + 1;
                this.setState({
                    winnerText: character.char_name + ' Wins!',
                    winner: character,
                    loser: opponent,
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
                this.context.updateCharacter(character, 'fight')
                this.context.updateCharacter(opponent, 'fight')
                const matchObject = {
                    winner: character.char_name,
                    loser: opponent.char_name,
                    char_1_id: character.id,
                    char_2_id: opponent.id,
                    points: 2
                }
                this.updateMatches(matchObject)
            }
            else if (userRoll < oppRoll) {
                opponent.current_points = Number(opponent.current_points) + 2;
                opponent.wins = Number(opponent.wins) + 1;
                character.losses = Number(character.losses) + 1;
                this.setState({
                    winnerText: opponent.char_name + ' Wins!',
                    winner: opponent,
                    loser: character,
                    char_1_id: character.id,
                    char_2_id: opponent.id
                })
                this.context.updateCharacter(character, 'fight')
                this.context.updateCharacter(opponent, 'fight')
                const matchObject = {
                    winner: opponent.char_name,
                    loser: character.char_name,
                    char_1_id: character.id,
                    char_2_id: opponent.id,
                    points: 2
                }
                this.updateMatches(matchObject)
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
    }

    updateMatches(matchObject) {
        fetch(config.API_MATCHES_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(matchObject),
            headers: {
                'Content-Type': 'application/json',
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

    updateNewOpponent() {
        const opponent = this.context.createNewOpponent(this.context.characters, this.context.user_id);

        this.setState({
            opponent: opponent,
            currentButton: 'Fight',
            winnerText: ' '
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
            this.updateNewOpponent()
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
                    character={this.context.character} />

                <div className="winner-button-display">
                    {button}
                    <p>{this.state.winnerText}</p>
                </div>
                <FightProfile
                    character={this.state.opponent} />
            </div>
        )
    }
}