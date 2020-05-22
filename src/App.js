import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom'
import './App.css';
import Character from './Character/Character'
import Message from './Message/Message'
import HandleLanding from './HandleLanding/HandleLanding'
import AboutGame from './AboutGame/AboutGame'
import Fight from './Fight/Fight'
import context from './context'
import config from './config'

// check the pathways for login, create, fight, update
// for some reason, when the points get to 100, it updates once to level 2 then back down to level 1. Database shows level 1, perhaps it gets reset by client side ? this occurs at every level update. level remains at 1.

class App extends Component {
  static contextType = context;
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      usernameErr: '',
      passwordErr: '',
      error: '',
      login: false,
      auth: '',
      username: '',
      user_id: '',
      character: '',
      attrpoints: '',
      level: '',
      opponent: {},
      handleLoginSubmit: () => { },
      submitUserInfo: () => { },
      updateCharacter: () => { },
      getCharacter: () => { },
      getCharactersList: () => { },
      createNewOpponent: () => { },
      createCharacter: () => { },
    }
  }

  componentDidMount() {
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(characters => {
        this.setState({
          characters: characters,
        })
      })
      .catch(error => this.setState({ error }))
  }

  createNewOpponent = (characters, userId) => {
    console.log('createNewOpponent ran')
 
    const opponents = characters.filter(player => player.user_id !== userId);

    const opponent = opponents[Math.floor(Math.random() * Math.floor(opponents.length))];  
    return opponent
  }

  handleLoginSubmit = (username, password) => {
    console.log('handleLoginSubmit ran')

    const object = {
      username: username,
      password: password
    }
    fetch(config.API_LOGIN_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(object),
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
      .then(data => {
        const opponent = this.createNewOpponent(this.state.characters, data.user.id)
        const character = this.state.characters.find(player => player.user_id === data.user.id)

        if (character === undefined) {
          this.setState({
            login: data.login,
            user_id: data.user.id,
            username: data.user.username,
            auth: data.user.auth,
            opponent: opponent,
            character: [],
            attrpoints: ''
          })
        } else {
          this.setState({
            login: data.login,
            user_id: data.user.id,
            username: data.user.username,
            auth: data.user.auth,
            opponent: opponent,
            character: character,
            attrpoints: character.attrpoints
          })  
        }
        
      })
      .catch(error => this.setState({ error }))
  }

  submitUserInfo = (object) => {
    const user_object = object;

    fetch(config.API_USERS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(user_object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(user => {
        this.setState({
          auth: user.auth,
          user_id: user.id,
          username: user.username,
          login: true
        })
      })
      .catch(error => this.setState({ error }))
  }
 
  createCharacter = (character) => {
    this.getCharactersList()
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(character),
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
      .then(character => {
        this.setState({
          character: character,
          attrpoints: Number(character.attrpoints)
        })
      })
      .catch(error => this.setState({ error }))
  }

  updateCharacter = (character, reason) => {
    console.log('updateCharacter ran')
   
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'PATCH',
      body: JSON.stringify(character),
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
    if (reason === 'fight') {
      this.getCharacter(this.state.character.user_id)
      this.getCharactersList()
    } else if (reason === 'attributes') {
      this.getCharacter(this.state.character.user_id)
    }
  }

  getCharacter = (user_id) => {
    console.log('getCharacter ran')
 
    fetch(config.API_CHARACTERS_ENDPOINT + `/${user_id}`, {
      method: 'GET',
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
      .then(character => {
 
        this.setState({
          character: character
        })
      })
      .catch(error => this.setState({ error }))
  }

  getCharactersList = () => {
    console.log('getCharactersList ran')
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(characters => {
        this.setState({
          characters: characters
        })
      })
      .catch(error => this.setState({ error }))
  }

  deleteCharacter = (charId) => {
    console.log('deleteCharacter ran')
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'DELETE',
      body: JSON.stringify(charId),
      headers: {
        'Content-Type': 'application/json'
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

  deleteUser = (userId) => {
    console.log('deleteUser ran')
    fetch(config.API_USERS_ENDPOINT, {
      method: 'DELETE',
      body: JSON.stringify(userId),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .catch(error => this.setState({ error }))
    this.setState({
      login: false
    })
  }

  handleLogout = () => {
    this.setState({
      login: false,
      character: []
    })
    this.props.history.push('/')
  }

  createNavRoutes() {
    if (this.state.login === true) {
      return (
        <div>
          <NavLink
            className="nav-link"
            to="/aboutVFC">About</NavLink>
          <NavLink
            className="nav-link"
            to={`/auth/:${this.state.character.char_name}/character`}>Character</NavLink>
          <NavLink
            className="nav-link"
            to="/fight">FIGHT!</NavLink>
          <button className="logout" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  createMainRoutes() {
    return (
      <>
        <Route
          exact
          path="/"
          component={HandleLanding}
        />
        <Route
          exact
          path="/message"
          component={Message}
        />
        <Route
          exact
          path="/aboutVFC"
          component={AboutGame}
        />
        <Route
          exact
          path="/auth/:user_id/character"
          component={Character}
        />
        <Route
          exact
          path="/fight"
          component={Fight}
        />
      </>
    )
  }

  render() {
    
    const contextValue = {
      characters: this.state.characters,
      usernameErr: this.state.usernameErr,
      passwordErr: this.state.passwordErr,
      login: this.state.login,
      auth: this.state.auth,
      username: this.state.username,
      user_id: this.state.user_id,
      character: this.state.character,
      attrpoints: this.state.attrpoints,
      level: this.state.level,
      opponent: this.state.opponent,
      handleLoginSubmit: this.handleLoginSubmit,
      submitUserInfo: this.submitUserInfo,
      updateCharacter: this.updateCharacter,
      getCharacter: this.getCharacter,
      getCharactersList: this.getCharactersList,
      createNewOpponent: this.createNewOpponent,
      deleteCharacter: this.deleteCharacter,
      deleteUser: this.deleteUser,
      createCharacter: this.createCharacter,
    }
    console.log(contextValue)

    return (
      <context.Provider value={contextValue}>
        <body>
          <nav role="navigation">{this.createNavRoutes()}</nav>
          <main role="main">
            {this.createMainRoutes()}
          </main>
          <footer role="content-info">Virtual Fight Club</footer>
        </body>
      </context.Provider>
    )
  }
}


export default withRouter(App)