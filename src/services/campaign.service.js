const campaignDao = require('../daos/campaign.dao');

async function create(data) {
    // resource.permissionLevel = 1;
    data.created_at = new Date().toISOString();
    return campaignDao.insertCampaign(data);
}

async function updateCampaignById(id, data) {
    // resource.permissionLevel = 1;
    return campaignDao.updateCampaignById(id, data);
}

async function getCampaignById(id) {
    // resource.permissionLevel = 1;
    return campaignDao.getCampaignById(id);
}

async function getAllCampaign() {
    // resource.permissionLevel = 1;
    return campaignDao.getAllCampaign();
}

module.exports = {
    create,
    updateCampaignById,
    getCampaignById,
    getAllCampaign
};