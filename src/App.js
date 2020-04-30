import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import './App.css';
import Character from './Character/Character'
import Message from './Message/Message'
// import Login from './Login/Login'
import HandleLanding from './HandleLanding/HandleLanding'
import AboutGame from './AboutGame/AboutGame'
import Fight from './Fight/Fight'
import context from './context'
import config from './config'
// import STORE from './STORE'


export default class App extends Component {
  static contextType = context;
  // usernameErr and passwordErr to be replaced by error - from server?
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
      attrPoints: '',
      level: '',
      handleLoginSubmit: () => { },
      submitUserInfo: () => { },
      updateCharacter: () => { },
      getCharacter: () => { },
      getCharactersList: () => { },
      error: '' 
    }
  }


  componentDidMount() {
    // Do I need something on this function right now? 
  }


  handleLoginSubmit = (username, password) => {
    console.log('handleLoginSubmit ran')

    const object = {
      username: username,
      password: password
    }
    console.log(object)

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
        console.log(data)
        this.setState({
          login: data.login,
          user_id: data.user.id,
          username: data.user.username,
          auth: data.user.auth,
          character: this.getCharacter(this.login, this.user_id),
          characters: this.getCharactersList(this.login, this.user_id)
        })
      })
      .catch(error => this.setState({ error }))

  }

  submitUserInfo = (object) => {
    // create an account
    const user_object = object;
    console.log(user_object)
    // handle new user information 
    // Add route to character page
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
        console.log(user)
        this.setState({
          auth: user.auth,
          user_id: user.id,
          username: user.username
        })
      })
      .catch(error => this.setState({ error }))
  }

  updateCharacter = (character, reason) => {
    // character can be updated by: 
    // 'fight' : winning a match - might be character or opponent
    // 'attributes' : updating attributes - will only be character
    // 'create' : creating a character - login will still be false at this point

    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(character),
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

    // must update character and characters 
    if (reason === 'fight') {
      //  get characters and character
      this.setState({
        character: this.getCharacter(this.state.login, this.state.user_id),
        charcters: this.getCharactersList(this.state.login, this.state.user_id)
      })
    } else if (reason === 'attributes') {
      //  get only character back
      this.setState({
        character: this.getCharacter(this.state.login, this.state.user_id)
      })
    } else if (reason === 'create') {
      this.setState({
        login: true,
        character: this.getCharacter(this.state.login, this.state.user_id),
        charcters: this.getCharactersList(this.state.login, this.state.user_id)
      })
    }
  }

  getCharacter = (login, user_id) => {
    // this should get character by id
    console.log('getCharacter ran')
    fetch(config.API_CHARACTERS_ID_ENDPOINT + `?login=${login}&userId=${user_id}`, {
      method: 'GET',
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
      .then(character => {
        console.log(character)
        return character[0]
      })
      .catch(error => this.setState({ error }))
  }

  getCharactersList = (login, user_id) => {
    console.log('getCharactersList ran')
    // this should get characters
    fetch(config.API_CHARACTERS_ENDPOINT + `?login=${login}&userId=${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(characters => {
        console.log(characters)
        return characters
      })
      .catch(error => this.setState({ error }))
  }

  createNavRoutes() {
    if (this.state.login === true) {
      return (
        <div>
          <div>
            <NavLink
              className="nav-link"
              to="/aboutVFC">About</NavLink>
            <NavLink
              className="nav-link"
              to={`/auth/:${this.state.character.char_name}/character`}>Character</NavLink>
            <NavLink
              className="nav-linkk"
              to="/fight">FIGHT!</NavLink>
          </div>
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
      attrPoints: this.state.attrPoints,
      level: this.state.level,
      handleLoginSubmit: this.handleLoginSubmit,
      submitUserInfo: this.submitUserInfo,
      updateCharacter: () => { },
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