/* Copyright G. Hemingway, 2017 - All rights reserved */
"use strict";

// Necessary modules
import React, { Component }     from 'react';
import { render }               from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CampaignProfile from './components/campaignProfile';
import Header from "./components/Header";
import CampaignStart from "./components/campaignStart";
import CampaignPage from "./components/campaignPage";
import CampaignLogin from "./components/campaignLogin";
import CampaignLanding from "./components/campaignLanding";
import CampaignLogout from "./components/campaignLogout";
// Bring app CSS into the picture
require('./app.css');

class MyApp extends Component {
    constructor(props) {
        super(props);
        sessionStorage.clear();
    }

    render() {
        return (
            <BrowserRouter>
            <div>
                <Route exact path="/" render={()=>
                <div><Header /><CampaignLanding /></div>}/>
                <Route path="/campaignProfile/:address" render={(props)=>
                <div><Header /><CampaignProfile address={props.match.params.address} /></div>} />
                <Route path="/campaignStart" render={()=>
                <div><Header /><CampaignStart /></div>}/>
                <Route path="/campaignPage/:id" render={(props)=>
                <div><Header /><CampaignPage id={props.match.params.id} /></div>}/>
                <Route path="/campaignLogin" render={()=>
                <div><Header /><CampaignLogin /></div>} />
                <Route path="/campaignLogout" render={(props)=>
                <div><Header {...props} /><CampaignLogout /></div>}/>
            </div>
            </BrowserRouter>
        );
    }

}

/* Think about storing some client-side state here */
render(
 <div><MyApp /></div>,
    document.getElementById('mainDiv')
);
