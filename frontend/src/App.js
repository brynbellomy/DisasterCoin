import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from './containers/Main'
import Header from './components/Header'

import './App.css'

class App extends Component {
  render () {
    return (
      <div style={{backgroundColor: '#FCFCFC'}}>
        <Header />
        <Main />
      </div>
    )
  }
}

export default App
