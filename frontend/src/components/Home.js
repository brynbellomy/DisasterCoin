import React from 'react'
import { connect } from 'react-redux'
import { Container, Jumbotron } from 'reactstrap'

const Home = (props) => (
  <div style={{width: '100%'}}>
    <div style={{position: 'relative', textAlign: 'center', color: 'white'}}>
      <img src={require('../pictures/flooding.jpeg')} style={{width: '100%'}} />
      <h1 style={{position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 64, width: '100%'}}>Let's get you back on your feet</h1>
    </div>
  </div>
)

const mapStatetoProps = (state) => {
  return {
    user: state.user.user
  }
}
export default connect(mapStatetoProps)(Home)
