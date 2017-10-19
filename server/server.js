
const express  = require('express')
const app      = express()
const port     = process.env.PORT || 8080

const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')

app.use(cookieParser())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(require('./routes'))

// error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send(err)
})

// launch ======================================================================
app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})
