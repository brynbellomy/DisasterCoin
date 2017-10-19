
const router = require('express').Router()

const asyncMiddleware = fn =>
    (req, res, next) => { Promise.resolve(fn(req, res, next)).catch(next) }

router.get('/campaigns', asyncMiddleware(async (req, res, next) => {
    res.json({ success: true })
}))

module.exports = router
