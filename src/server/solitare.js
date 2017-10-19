/* Copyright G. Hemingway, @2017 */
'use strict';

let shuffle = (array) => {
    let curIndex = array.length, tempVal, rIndex;

    //while there are elements
    while (0 !== curIndex) {
        rIndex = Math.floor(Math.random() * curIndex);
        curIndex -= 1;

        tempVal = array[curIndex];
        array[curIndex] = array[rIndex];
        array[rIndex] = tempVal;
    }

    return array;
}
// this is the Knuth shuffle algorithm
let shuffleCards = (includeJokers = false) => {

    //create the cards 
    let suits=['diamonds','hearts','clubs','spades'];
    let numbers = [...Array(13)].map((_,i) => i+1);
    let allCards = [];
    suits.map( (suit) => {
        numbers.map( (num)=>{
            allCards.push({
                mSuit: suit,
                mNum: num,
                up: false,
            });
        });
    });
    
    allCards=shuffle(allCards);

    return allCards;
};

let initialState = () => {
    /* Use the above function.  Generate and return an initial state for a game */
    
    let state = {
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
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
    };
    let allCards = shuffleCards();


    state.pile1 = state.pile1.concat(allCards.slice(0,1));
    state.pile2 = state.pile2.concat(allCards.slice(1,3));
    state.pile3 = state.pile3.concat(allCards.slice(3,6));
    state.pile4 = state.pile4.concat(allCards.slice(6,10));
    state.pile5 = state.pile5.concat(allCards.slice(10,15));
    state.pile6 = state.pile6.concat(allCards.slice(15,21));
    state.pile7 = state.pile7.concat(allCards.slice(21,28));
    state.draw = state.draw.concat(allCards.slice(28,52));
    return state;

};

shuffleCards();
module.exports = {
    shuffleCards: shuffleCards,
    initialState: initialState
};