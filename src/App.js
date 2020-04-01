import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import './App.css';
import Character from './Character/Character'
import Message from './Message/Message'
import Login from './Login/Login'
import HandleLanding from './HandleLanding/HandleLanding'
import AboutGame from './AboutGame/AboutGame'
import Fight from './Fight/Fight'
import context from './context'
import STORE from './STORE'

// maybe every 50 points they level up and get 10 points toward their character. How do I handle this and where? Points and level should probably be handled by context and the functions to handle the updates in App.vvv really just need to build my server first........

export default class App extends Component {
  static contextType = context;
  constructor(props){
    super(props);
    this.state={
      users: [],
      characters: [],
      matches:[],
      handleLoginSubmit: ()=>{},
      handleSubmitUserInfo: ()=>{},
      usernameErr:'',
      passwordErr:'',
      login: false,
      user: '',
      points: '',
      level: '',
      attrPoints: ''
    }
  }
  

  componentDidMount(){
    // Do I need something on this function right now? 
    const store = STORE;
    console.log(store)
    console.log(store.users)
    
    // fetch the data
    // right now using STORE
    this.setState({
      users: store.users,
      characters: store.characters,
      matches: store.matches,
    })
  }


  handleLoginSubmit=(username,password)=>{
    console.log('handleLoginSubmit ran')
    console.log('I wish git worked better')
    const userName = username;
    const passWord = password;
    // need to verify username and password
    // collect user information
    // for right now this is how it needs to be laid out, but this code will have to be after authentication - not sure how to do that yet with the unique users.

    const user = this.state.users.find(user => user.username === userName)
    console.log(user)
    if (!user){
        this.setState({
            usernameErr: `Could not find username ${userName}`
        })
    }
    else if (user.password !== passWord){
        this.setState({
            passwordErr: `Password does not match, please try again`
        })
    }    
    else if (user.username === userName && user.password === passWord){
      this.setState({
        login: true,
        user: user
      })
    }
  }
  
  submitUserInfo=(e)=>{
    e.preventDefault();
    // handle new user information 
    // route to character page
  }


  updateLevels(){
    // would have to post this to server
    // assume levels is stored in context along with points
    // need to add attribute points to context as well
    if (this.context.points%50 === 0){
      const newLevel = (this.context.points/50);
      const newAttrPoints = 10;
      this.setState({
        level: newLevel,
        attrPoints: newAttrPoints
      })
    }
    // post these to server
  }

  updatePoints(){
    // would have to post this to server
  }

  createNavRoutes(){
    if (this.state.login === true){
      return(
        <div>
          <div>
            <NavLink 
              className="nav-link"
              to="/aboutVFC">About</NavLink>
            <NavLink 
              className="nav-link"
              to={`/auth/:${this.state.user.username}/character`}>Character</NavLink>
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

  createMainRoutes(){
    return(
      <>
      <Route
        exact
        path="/"
        component={HandleLanding}
      />
      <Route 
        exact 
        path="/message" 
        component={Message}/>
      <Route
        exact
        path="/auth/:user/register"
        component={Character}
      />
      <Route
        exact
        path="/auth/:user/login"
        component={Login}
      />
      <Route
        exact
        path="/aboutVFC"
        component={AboutGame}
      />
      <Route
        exact
        path="/auth/:user/character"
        component={Character}
      />
      <Route
        exact
        path="/fight"
        component={Fight}
      />
      {/* have decided to put login and create account both on landing page as children components. still need to update logged in logic */}
      </>
    )
  }

  render(){
    
    const contextValue = {
      users: this.state.users,
      characters: this.state.characters,
      matches: this.state.matches,
      usernameErr: this.state.usernameErr,
      passwordErr: this.state.passwordErr,
      login: this.state.login,
      user: this.state.user,
      handleLoginSubmit: this.handleLoginSubmit,
      submitUserInfo: this.submitUserInfo,

    }
    
    console.log(this.state)
    console.log(contextValue)
    return (
      <context.Provider value={contextValue}>
        <div>
          <body>
            <nav role="navigation">{this.createNavRoutes()}</nav>
            <main role="main">
              {this.createMainRoutes()}
            </main>
            <footer role="content-info">Virtual Fight Club</footer>
          </body>
        </div>  
      </context.Provider>
    )
  }
}