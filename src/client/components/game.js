/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Row, Col, Grid} from 'react-bootstrap';
import styled from 'styled-components';
/*************************************************************************/

/**
 * still workin
 */


//this is for the cards on the top
const Card = styled.img.attrs({
        src: props => props.up ? props.Src :'/images/klondike.jpg'
    })`width: 150px;
    visibility: ${props => props.empty ? 'hidden' : 'visible'};
    padding: 0;
    margin: 0 -2px 0px -2px;
    padding: 0px 2px 0px 2px;
    z-index:-1;`;
//pile cards on the bottom
const Pile = styled.img.attrs({ 
        src: props => props.up ? props.Src :'/images/klondike.jpg'
    })`
    width: 100%;
    position: relative;
    margin: 0px -2px -140px 10px;
    padding: 10px 5px 0px 5px;
    z-index: -1;
    `

    //this is for the border outline
    const Break = styled.div`
    margin-top: 5%;
    position: relative;
    `

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            pile1: [],
            pile2: [],
            pile3: [],
            pile4: [],
            pile5: [],
            pile6: [],
            pile7: [],
            stack1: [],
            stack2: [],
            stack3: [],
            stack4: [],
            draw: [],
            discard: []
        }
        this.createPile = this.createPile.bind(this);
    }
    componentWillMount() {
        console.log(this.props.id);
        axios
            .get(`/v1/game/${this.props.id}`)
            .then((res) => {
                console.log(res);
                if(res.status!=200) {
                    console.error("this is an error do something");
                } else {

                    this.setState( (state)=>({
                        pile1: state.pile1.concat(res.data.pile1),
                        pile2: state.pile2.concat(res.data.pile2),
                        pile3: state.pile3.concat(res.data.pile3),
                        pile4: state.pile4.concat(res.data.pile4),
                        pile5: state.pile5.concat(res.data.pile5),
                        pile6: state.pile6.concat(res.data.pile6),
                        pile7: state.pile7.concat(res.data.pile7),
                    }));
                    console.log(this.state.pile7);
                }
            });
    }
    createPile = (pile) => {
        const special = ["jack","queen","king"];
        const pLength = this.state[pile].length;
        const pCard = this.state[pile].map( (elem,index)=>{
            
            let mSrc;
            let path = "/images/";
            let mEnd = elem.mSuit + ".png";
            //do mod 1-1 to get ur over
            if (elem.mNum==1) {
                mSrc = path + "ace_of_" + mEnd;
            } else if (elem.mNum>=11) {
                let mSpecial  = special[elem.mNum%10-1];
                mSrc = path + mSpecial + "_of_" + mEnd;
            } else  {
                mSrc = path + elem.mNum +"_of_"+ mEnd;
            }
            if( index != pLength-1){
            return (<Pile key={index} Src={mSrc}/>)} else {
                return (<Pile key={index} up Src={mSrc}/>);
            }
        });
        return pCard;
    }


    render() {
        const pile1 =this.createPile("pile1");
        const pile2 = this.createPile("pile2");
        const pile3 = this.createPile("pile3");
        const pile4 = this.createPile("pile4");
        const pile5 = this.createPile("pile5");
        const pile6 = this.createPile("pile6");
        const pile7 = this.createPile("pile7");
        
        const mockup = (
            <div>
                <Grid>
                    <Row>
                        <Col xs={4}>
                            <Card Src='/images/klondike.jpg'/>
                            <Card up Src='/images/2_of_spades.png'/>
                        </Col>
                        <Col xs={8}>
                           <Card  src='/images/klondike.jpg'/>
                            <Card  src='/images/klondike.jpg'/>
                           <Card  src='/images/klondike.jpg'/>
                            <Card  src='/images/klondike.jpg'/>
                        </Col>
                    </Row>
                    <Break />
                        <Col xs={2}>{pile1}</Col>
                    <Col xs={10}>
                       <Col xs={2}>{pile2}</Col>
                        <Col xs={2} >{pile3}</Col>
                        <Col xs={2} > {pile4} </Col>
                        <Col xs={2} >{pile5}</Col>
                        <Col xs={2} >{pile6}</Col>
        <Col xs={2} >{pile7}</Col>
                    </Col>
                    </Grid>
            </div>
        )
        return (mockup);
    }
}

export default withRouter(Game);
