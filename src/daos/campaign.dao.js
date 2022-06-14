const mongoose = require('../services/mongoose.service');

const campaignSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    created_by: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number
    },
    referrer_price: {
        type: Number
    },
    day: {
        type: Number
    }
})

Campaign = mongoose.model('campaigns', campaignSchema);

async function insertCampaign(data) {
    try {
        const campaign = new Campaign({
            ...data,
        });
        let newCampaign = await campaign.save();
        console.log("1 campaign document inserted");
        return newCampaign;
    } catch (err) {
        throw err;
    }
}

async function updateCampaignById(id, data) {
    try {
        const campaign = await Campaign.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        ).exec();
        return campaign;
    } catch (err) {
        throw err;
    }
}

async function getAllCampaign() {
    try {
        let existingCampaigns = Campaign.find().exec();
        return existingCampaigns;
    } catch (err) {
        throw err;
    }
}

async function getCampaignById(id) {
    try {
        let existingCampaign = Campaign.findOne({ _id: id }).exec();
        return existingCampaign;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertCampaign,
    updateCampaignById,
    getAllCampaign,
    getCampaignById
};