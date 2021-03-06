import React, { Component } from 'react';
import { Route, Link, NavLink, withRouter } from 'react-router-dom';
import './App.css';
import Character from './Character/Character';
import Message from './Message/Message';
import HandleLanding from './HandleLanding/HandleLanding';
import AboutGame from './AboutGame/AboutGame';
import Fight from './Fight/Fight';
import context from './context';
import config from './config';

class App extends Component {
  static contextType = context;
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      usernameErr: '',
      passwordErr: '',
      error: '',
      loginError: '',
      login: false,
      auth: '',
      username: '',
      user_id: '',
      character: {},
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
    };
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
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(characters => {
        this.setState({
          characters: characters,
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  createNewOpponent = (characters, userId) => {

    const opponents = characters.filter(player => player.user_id !== userId);

    const opponent = opponents[Math.floor(Math.random() * Math.floor(opponents.length))];
    return opponent;
  }

  handleLoginSubmit = (username, password) => {
    const object = {
      username: username,
      password: password
    };
    fetch(config.API_LOGIN_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
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
            character: {},
            attrpoints: ''
          });
        } else {
          this.setState({
            login: data.login,
            user_id: data.user.id,
            username: data.user.username,
            auth: data.user.auth,
            opponent: opponent,
            character: character,
            attrpoints: character.attrpoints
          });
        }

      })
      .catch(error => {
        this.setState({
          loginError: 'Password or Username is incorrect, please verify login information'
        });
      })
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
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(user => {
        this.setState({
          auth: user.auth,
          user_id: user.id,
          username: user.username,
          login: true
        });
      })
      .catch(error =>
        this.setState({ error })
      )
  }

  createCharacter = (character) => {
    this.getCharactersList();
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(character),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(character => {
        this.setState({
          character: character,
          attrpoints: Number(character.attrpoints),
        });
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  updateCharacter = (character, reason) => {
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'PATCH',
      body: JSON.stringify(character),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .catch(error => this.setState({ error }))
    if (reason === 'fight') {
      this.getCharacter(this.state.character.user_id);
      this.getCharactersList();
    } else if (reason === 'attributes') {
      this.getCharacter(this.state.character.user_id);
    }
  }

  getCharacter = (user_id) => {
    fetch(config.API_CHARACTERS_ENDPOINT + `/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(character => {
        this.setState({
          character: character
        });
      })
      .catch(error => this.setState({ error }))
  }

  getCharactersList = () => {
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(characters => {
        this.setState({
          characters: characters
        });
      })
      .catch(error => this.setState({ error }))
  }

  deleteCharacter = (charId) => {
    const idObject = { id: charId };
    fetch(config.API_CHARACTERS_ENDPOINT, {
      method: 'DELETE',
      body: JSON.stringify(idObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .catch(error => this.setState({ error }))

      this.setState({
        character: {},
        attrpoints: '',
        level: '',
      });
      this.getCharactersList();
  }

  deleteUser = (userId) => {
    const idObject = { id: userId };
    fetch(config.API_USERS_ENDPOINT, {
      method: 'DELETE',
      body: JSON.stringify(idObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .catch(error => this.setState({ error }))

      this.setState({
        login: false,
        auth: '',
        username: '',
        user_id: '',
        character: {},
        attrpoints: '',
        level: '',
        opponent: {},
      });
      this.getCharactersList();
  }

  handleLogout = () => {
    this.setState({
      login: false,
      character: {}
    });
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
            to={`/characterPage/${this.state.character.char_name}`}>Character</NavLink>
          <NavLink
            className="nav-link"
            to="/fight">FIGHT!</NavLink>
          <button className="logout" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      )
    } else {
      return <div></div>
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
          path="/aboutVFC"
          component={AboutGame}
        />
        <Route
          exact
          path="/characterPage/:character"
          component={Character}
        />
        <Route
          exact
          path="/fight"
          component={Fight}
        />
        <Route
          exact
          path="/message"
          component={Message}
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
      loginError: this.state.loginError,
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
      error: this.state.error
    };

    return (
      <context.Provider value={contextValue}>
        <>
          <div className="body">
            <div className="container">
              <nav role="navigation">{this.createNavRoutes()}</nav>
              <main role="main">
                {this.createMainRoutes()}
              </main>
              <footer className="footer" role="contentinfo"><Link className="link" to="/">Virtual Fight Club</Link></footer>
            </div>
          </div>
        </>
      </context.Provider>
    )
  }
}


export default withRouter(App)