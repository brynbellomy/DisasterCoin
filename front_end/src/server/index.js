/* Copyright G. Hemingway, @2017 */
'use strict';

let path            = require('path'),
    express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    _               = require('underscore');

let port = process.env.PORT ? process.env.PORT : 8080;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

/**********************************************************************************************************/

// Setup our Express pipeline
let app = express();
if (env !== 'test') app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../../public')));
app.engine('pug', require('pug').__express);
app.set('views', __dirname);
app.use(bodyParser.urlencoded({ extended: true }));

// Import our routes
require('./routes')(app);

// Build up the server-side data structures
app.users = [
    {
        username: 'tumbler',
        password: 'WBush',
        first_name: 'George',
        last_name: 'Bush',
        city: 'Dallas',
        primary_email: 'decider@dubya.bush.com',
        games: []
    },
    {
        username: 'eagle',
        password: 'BlueDress',
        first_name: 'William',
        last_name: 'Clinton',
        city: 'Hope',
        primary_email: 'slickwilly@clinton.com',
        games: []
    },
    {
        username: 'renegade',
        password: 'yeswecan',
        first_name: 'Barak',
        last_name: 'Obama',
        city: 'Chicago',
        primary_email: 'all.done@potus.gov',
        games: []
    },
    {
        username: 'timberwolf',
        password: 'nobroccoli',
        first_name: 'George',
        last_name: 'Bush',
        city: 'Kennebunkport',
        primary_email: 'notgonnadoit@original.bush.com',
        games: []
    },
    {
        username: 'rawhide',
        password: 'lovenancy',
        first_name: 'Ronald',
        last_name: 'Reagan',
        city: 'Los Angeles',
        primary_email: 'gipper@reagan.com',
        games: []
    }
];

// There are no games yet!
app.games = [];

/**********************************************************************************************************/

// Give them the SPA base page
app.get('*', (req, res) => {
    res.render('base.pug', {});
});

/**********************************************************************************************************/

// Run the server itself
let server = app.listen(port, () => {
    console.log('Assignment 3 app listening on ' + server.address().port);
});
