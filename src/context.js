import React from 'react'

const context = React.createContext({
  users:[],
  characters:[],
  matches:[],
  handleUpdateLoginLogic: () => {},
  handleLoginSubmit: ()=>{},
  handleSubmitUserInfo: ()=>{},
  usernameErr:'',
  passwordErr:'',
  login: false,
  user: []
})

export default context