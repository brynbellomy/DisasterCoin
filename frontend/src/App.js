import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from './containers/Main'
import Header from './components/Header'

import './App.css'

class App extends Component {
  render () {
    let campaigns = {campaigns: []}
    let users = { users: []}
    sessionStorage.setItem('campaigns',JSON.stringify(campaigns))
    sessionStorage.setItem('users',JSON.stringify(users))
    return (
      <div style={{backgroundColor: '#FCFCFC'}}>
        <Header />
        <Main />
      </div>
    )
  }
}

export default App
