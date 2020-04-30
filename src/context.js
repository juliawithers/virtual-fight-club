import React from 'react'

const context = React.createContext({
  characters:[],
  usernameErr:'',
  passwordErr:'',
  login: false,
  user_id: '',
  character: {},
  attrPoints: '',
  level: '',
  handleLoginSubmit: ()=>{},
  handleSubmitUserInfo: ()=>{},
})

export default context