import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Profile from '../components/Profile'
import Create from '../components/Create'
import Home from '../components/Home'
import CampaignPage from '../components/CampaignPage'
import Landing from '../components/Landing'
import Vendors from '../components/Vendors'
import Logout from '../components/Logout'
// import logo from './logo.svg'

const Profiles = () =>
 <Switch>
   <Route exact path={'/profile/:address'} component={Profile} />
 </Switch>

const Main = (props) =>
  <main>
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route path='/profile' component={Profiles} />
      <Route path='/create' component={Create} />
      <Route path='/campaign/:id' component={CampaignPage} />
      <Route path='/campaigns' component={Landing} />
      <Route path='/vendors' component={Vendors} />
      <Route path='/logout' component={Logout} />
    </Switch>
  </main>

export default Main
