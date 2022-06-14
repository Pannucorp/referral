const history = require('../services/history.service');

async function create(req, res, next) {
    try {
        res.json(await history.create(req.body));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getAllHistory(req, res, next) {
    try {
        res.json(await history.getAllHistory());
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getHistoryById(req, res, next) {
    try {
        res.json(await history.getHistoryById(req.params.historyId));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getHistoryByCampaignId(req, res, next) {
    try {
        res.json(await history.getHistoryByCampaignId(req.params.campaignId));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getHistoryByReferrerId(req, res, next) {
    try {
        res.json(await history.getHistoryByReferrerId(req.params.referrerId));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getHistoryByCampaignIdAndReferrerId(req, res, next) {
    try {
        res.json(await history.getHistoryByCampaignIdAndReferrerId(req.body.campaign_id, req.body.referrer_id));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getHistoryByCampaignIdAndMediumType(req, res, next) {
    try {
        res.json(await history.getHistoryByCampaignIdAndMediumType(req.body.campaign_id, req.body.medium_type));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function getHistoryById(req, res, next) {
    try {
        res.json(await history.getHistoryById(req.params.historyId));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function updateHistoryById(req, res, next) {
    try {
        res.json(await history.updateHistoryById(req.params.historyId, req.body));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

module.exports = {
    create,
    getAllHistory,
    getHistoryById,
    updateHistoryById,
    getHistoryByCampaignId,
    getHistoryByReferrerId,
    getHistoryByCampaignIdAndReferrerId,
    getHistoryByCampaignIdAndMediumType,
};