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
      <Route path='/campaignProfile/:address' component={CampaignProfile} />
      <Route path='/campaignStart' component={CampaignStart} />
      <Route path='/campaignPage/:id' component={CampaignPage} />
      <Route path='/campaignLogin' component={CampaignLogin} />
      <Route path='/campaignLogout' component={CampaignLogout} />
    </Switch>
  </main>

export default Main
