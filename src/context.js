import React from 'react'

const context = React.createContext({
  characters:[],
  usernameErr:'',
  passwordErr:'',
  login: false,
  signupError: '',
  loginError: '',
  error: '',
  auth: '',
  username: '',
  user_id: '',
  character: {},
  attrPoints: '',
  level: '',
  opponent: {},
  handleLoginSubmit: ()=>{},
  submitUserInfo: ()=>{},
  getCharacter: ()=>{},
  getCharacterList: ()=>{},
  createNewOpponent: ()=>{},
  deleteCharacter:()=>{},
  deleteUser:()=>{},
  createCharacter: ()=>{}
})

export default context