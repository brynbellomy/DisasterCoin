
const router = require('express').Router()
const db = require('./db')

const asyncMiddleware = fn =>
    (req, res, next) => { Promise.resolve(fn(req, res, next)).catch(next) }

router.get('/campaigns', asyncMiddleware(async (req, res, next) => {
    let campaigns = await db.getAllCampaigns()

    let ps = campaigns.map(addr => {
        return db.getCampaign(addr)
    })

    campaigns = await Promise.all(ps)

    res.json(campaigns)
}))

router.get('/campaign/:addr', asyncMiddleware(async (req, res, next) => {
    let campaign = await db.getCampaign(req.params.addr)
    res.json(campaign)
}))

router.get('/campaigns/user/:user', asyncMiddleware(async (req, res, next) => {
    let campaigns = await db.getCampaigns()

    let ps = campaigns.map(addr => {
        return db.getCampaign(addr)
    })

    campaigns = await Promise.all(ps)
    campaigns = campaigns.filter(campaign => campaign.campaigner === req.params.user)

    res.json(campaigns)
}))

router.get('/campaigns/donator/:donator', asyncMiddleware(async (req, res, next) => {
    let campaigns = await db.getCampaigns()

    let ps = campaigns.map(addr => {
        return db.getCampaign(addr)
    })

    campaigns = await Promise.all(ps)
    campaigns = campaigns.filter(campaign => Object.keys(campaign.fundsByDonator).indexOf(req.params.donator) >= 0)

    res.json(campaigns)
}))

router.get('/vendors', asyncMiddleware(async (req, res, next) => {
    let vendors = await db.getVendors()
    res.json(vendors)
}))

router.get('/vendor-tags', asyncMiddleware(async (req, res, next) => {
    let tags = await db.getAllVendorTags()
    res.json(tags)
}))

module.exports = router
