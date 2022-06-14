const historyDao = require('../daos/history.dao');

async function create(data) {
    // resource.permissionLevel = 1;
    return historyDao.insertHistory(data);
}

async function updateHistoryById(id, data) {
    // resource.permissionLevel = 1;
    return historyDao.updateHistoryById(id, data);
}

async function getHistoryById(id) {
    // resource.permissionLevel = 1;
    return historyDao.getHistoryById(id);
}

async function getHistoryByCampaignId(id) {
    // resource.permissionLevel = 1;
    return historyDao.getHistoryByCampaignId(id);
}

async function getHistoryByReferrerId(id) {
    // resource.permissionLevel = 1;
    return historyDao.getHistoryByReferrerId(id);
}

async function getHistoryByCampaignIdAndReferrerId(campaign_id, referrer_id) {
    // resource.permissionLevel = 1;
    return historyDao.getHistoryByCampaignIdAndReferrerId(campaign_id, referrer_id);
}

async function getHistoryByCampaignIdAndMediumType(id, mediumType) {
    // resource.permissionLevel = 1;
    return historyDao.getHistoryByCampaignIdAndMediumType(id, mediumType);
}

async function getAllHistory() {
    // resource.permissionLevel = 1;
    return historyDao.getAllHistory();
}

module.exports = {
    create,
    updateHistoryById,
    getHistoryById,
    getAllHistory,
    getHistoryByCampaignId,
    getHistoryByReferrerId,
    getHistoryByCampaignIdAndReferrerId,
    getHistoryByCampaignIdAndMediumType
};