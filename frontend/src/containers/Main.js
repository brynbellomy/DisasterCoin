import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Profile from '../components/Profile'
import Create from '../components/Create'
import Home from '../components/Home'
import Campaign from '../components/Campaign'
import Landing from '../components/Landing'
import Vendors from '../components/Vendors'
import Logout from '../components/Logout'
import Loans from '../components/Loans'
// import logo from './logo.svg'

const ProfilesHandler = () =>
 <Switch>
   <Route exact path={'/profile/:address'} component={Profile} />
 </Switch>

const LoansHandler = () =>
  <Switch>
    <Route exact path={'/loans'} component={Loans} />
    {/* <Route exact path={'/loans/:id'} component={LoanPage} /> */}
  </Switch>
const Main = (props) =>
  <main>
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route path='/profile' component={ProfilesHandler} />
      <Route path='/create' component={Create} />
      <Route path='/campaign/:id' component={Campaign} />
      <Route path='/campaigns' component={Landing} />
      <Route path='/vendors' component={Vendors} />
      <Route path='/logout' component={Logout} />
      <Route path='/loans' component={LoansHandler} />
    </Switch>
  </main>

export default Main
