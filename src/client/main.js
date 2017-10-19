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
// Bring app CSS into the picture
require('./app.css');
/*************************************************************************/
/*
class MyApp extends Component {
    constructor(props) {
        super(props);
    } 
    componentWillMount() {
        sessionStorage.clear();
        sessionStorage.setItem('isLoggedIn','false');
    }
    render() {
        return(
        <div>
        <BrowserRouter>
           <div>
               <Route exact path="/" render={()=>
               <div><Header  /><Landing /></div>}/>
               <Route path="/login" render={()=>
                <div> <Header  /><Login  /></div>}/>
                <Route path="/register" render={()=>
                <div><Header /><Register/></div>}/>
                <Route path="/profile/:id" render={(props)=>
                <div><Header /><Profile user={props.match.params.id} /></div>}/>
                <Route path="/results/:id" render={(props)=>
                <div><Header /><Results id={props.match.params.id}/></div>}/>
                <Route path="/start" render={()=>
                <div><Header /><Start /></div>}/>
                <Route path="/logout" render={(props)=>
                <div><Header logout={props.location.logout} /><Logout /></div>}/>
                <Route path="/game/:id" render={(props)=>
                <div><Header /><Game id={props.match.params.id}/></div>}/>
                <Route path="/edit" render={(props)=>
                console.log("not implented yet")}/>
           </div>
           </BrowserRouter></div>);
    }
}

*/

class MyApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
            <div>
                <Route path="/campaignProfile" render={()=>
                <div><Header /><CampaignProfile /></div>} />
                <Route path="/campaignStart" render={()=>
                <div><Header /><CampaignStart /></div>}/>
                <Route path="/campaignPage/:id" render={(props)=>
                <div><Header /><CampaignPage id={props.match.params.id} /></div>}/>
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
