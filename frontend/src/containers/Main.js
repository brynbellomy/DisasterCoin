import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CampaignProfile from '../components/campaignProfile'
import CampaignStart from '../components/campaignStart'
import CampaignPage from '../components/campaignPage'
import CampaignLogin from '../components/campaignLogin'
import CampaignLanding from '../components/campaignLanding'
import CampaignLogout from '../components/campaignLogout'
// import logo from './logo.svg'
const Main = () =>
  <main>
    <Switch>
      <Route exact path='/' component={CampaignLanding} />
      <Route path='/profile/:address' component={CampaignProfile} />
      <Route exact path='/create' component={CampaignStart} />
      <Route path='/campaign/:id' component={CampaignPage} />
      <Route path='/login' component={CampaignLogin} />
      <Route path='/logout' component={CampaignLogout} />
    </Switch>
  </main>

export default Main
