const campaign = require('../services/campaign.service');

async function create(req, res, next) {
    try {
        res.json(await campaign.create(req.body));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getAllCampaign(req, res, next) {
    try {
        res.json(await campaign.getAllCampaign());
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getCampaignById(req, res, next) {
    try {
        res.json(await campaign.getCampaignById(req.params.campaignId));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function updateCampaignById(req, res, next) {
    try {
        res.json(await campaign.updateCampaignById(req.params.campaignId, req.body));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

module.exports = {
    create,
    getAllCampaign,
    getCampaignById,
    updateCampaignById
};