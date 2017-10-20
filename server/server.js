
const express  = require('express')
const app      = express()
const port     = process.env.PORT || 8080

const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const loghandler   = require('./loghandler')
const cors = require('cors')

app.use(cors())
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

app.listen(port, '0.0.0.0', err => {
    if (err) {
        console.log(err)
        return
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})

loghandler()
