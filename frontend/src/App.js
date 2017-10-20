import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from './containers/Main'
import Header from './components/Header'
import './App.css'

const App = (props) => (
  <div style={{backgroundColor: '#FCFCFC'}}>
    <Header user={props.user} />
    <Main />
  </div>
)

const mapStatetoProps = (state) => {
  return {
    user: state.user.user
  }
}
export default connect(mapStatetoProps)(App)
