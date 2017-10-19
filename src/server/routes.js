/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

let _               = require('underscore'),
    Solitare        = require('./solitare');


module.exports = (app) => {

    // Handle POST to create a user session (i.e. log on)
    app.post('/v1/session', function(req, res) {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).send({ error: 'username and password required' });
        } else {
            let user = _.findWhere(app.users, { username: req.body.username.toLowerCase() });
            if (!user || user.password !== req.body.password) {
                if (user) console.log(`Password: ${user.password} vs. ${req.body.password}`);
                else console.log(`User not found: ${req.body.username}: [${app.users.map((user)=>user.username)}]`);
                res.status(401).send({ error: 'unauthorized' });
            } else {
                res.status(201).send({
                    username:       user.username,
                    primary_email:  user.primary_email
                });
            }
        }
    });

    // Handle POST to create a new user account
    app.post('/v1/user', function(req, res) {
        let data = req.body;
        if (!data ||
            !data.username ||
            !data.password ||
            !data.first_name ||
            !data.last_name ||
            !data.city ||
            !data.primary_email) {
            res.status(400).send({ error: 'username, password, first_name, last_name, city and primary_email required' });
        } else {
            let user = _.findWhere(app.users, { username: data.username.toLowerCase() });
            if (user) {
                res.status(400).send({ error: 'username already in use' });
            } else {
                let newUser = _.pick(data, 'username', 'first_name', 'last_name', 'password', 'city', 'primary_email');
                app.users.push(newUser);
                res.status(201).send({
                    username:       data.username,
                    primary_email:  data.primary_email
                });
            }
        }
    });

    // Handle GET to fetch user information
    app.get('/v1/user/:username', function(req, res) {
        let user = _.findWhere(app.users, { username: req.params.username.toLowerCase() });
        if (!user) {
            res.status(404).send({ error: 'unknown user' });
        } else {
            user = _.pick(user, 'username', 'first_name', 'last_name', 'city', 'primary_email');
            user.games = app.games.map(game => {
                let g = _.clone(game);
                g.moves = g.moves ? g.moves.length : 0;
                // Give the game a duration instead of just a start time
                g.duration = Date.now() - g.startTime;
                delete g.startTime;
                return g;
            });
            res.status(200).send(user);
        }
    });

    // Handle POST to create a new game
    app.post('/v1/game', function(req, res) {
        let data = req.body;
        if (!data ||
            !data.game ||
            !data.color ) {
            res.status(400).send({ error: 'game and color fields required' });
        } else {
            if (data.game === 'klondyke') {
                let newGame = {
                    active: true,
                    cards_remaining: 52,
                    color: data.color,
                    drawCount: data.draw,
                    startTime: Date.now(),
                    game: data.game,
                    score: 0,
                    start: Date.now(),
                    winner: "",
                    moves: []
                };

                // Generate a new initial game state
                newGame = _.extend(newGame, Solitare.initialState());
                app.games.push(newGame);
                res.status(201).send({
                    id: newGame.id
                });
            } else res.status(404).send({ error: "Not implemented" });
        }
    });

    // Handle GET to fetch game information
    app.get('/v1/game/:id', function(req, res) {
        let game = _.findWhere(app.games, { id: req.params.id.toLowerCase() });
        console.log(app.games);
        if (!game) {
            res.status(404).send({ error: 'unknown game id' });
        } else {
            res.status(200).send(game);
        }
    });

    // Provide end-point to request shuffled deck of cards and initial state - for testing
    app.get('/v1/cards/shuffle', (req, res) => {
        res.send(Solitare.shuffleCards(false));
    });
    app.get('/v1/cards/initial', (req, res) => {
        res.send(Solitare.initialState());
    });

};
