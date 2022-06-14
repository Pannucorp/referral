const mongoose = require('../services/mongoose.service');

const historySchema = new mongoose.Schema({
    campaign_id: {
        type: String,
        required: true
    },
    medium_type: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true,
    },
    referrer_id: {
        type: Number,
        required: true,
    },
    user_id: {
        type: Number,
    },
    referral_code: {
        type: String,
    },
    sent_at: {
        type: String,
    },
    clicked_at: {
        type: String,
    },
    signed_at: {
        type: String,
    },
    eligible_at: {
        type: String,
    },
    note: {
        type: String,
    },
    referrer_earn: {
        type: String,
    },
    receiver_earn: {
        type: String,
    },
    earned: {
        type: Boolean,
        default: false
    }
})

campaignHistory = mongoose.model('history', historySchema);

async function insertHistory(data) {
    try {
        const history = new campaignHistory({
            ...data,
        });
        let newHistory = await history.save();
        console.log("1 history document inserted");
        return newHistory;
    } catch (err) {
        throw err;
    }
}

async function getAllHistory() {
    try {
        let existingHistories = campaignHistory.find().exec();
        return existingHistories;
    } catch (err) {
        throw err;
    }
}

async function getHistoryById(id) {
    try {
        let existingHistory = campaignHistory.findOne({ _id: id }).exec();
        return existingHistory;
    } catch (err) {
        throw err;
    }
}

async function getHistoryByCampaignId(id) {
    try {
        let existingHistories = campaignHistory.find({ campaign_id: id }).exec();
        return existingHistories;
    } catch (err) {
        throw err;
    }
}

async function getHistoryByReferrerId(id) {
    try {
        let existingHistories = campaignHistory.find({ referrer_id: id }).exec();
        return existingHistories;
    } catch (err) {
        throw err;
    }
}

async function getHistoryByCampaignIdAndReferrerId(campaign_id, referrer_id) {
    try {
        let existingHistories = campaignHistory.find({ campaign_id: campaign_id, referrer_id: referrer_id }).exec();
        return existingHistories;
    } catch (err) {
        throw err;
    }
}

async function getHistoryByCampaignIdAndMediumType(id, mediumType) {
    try {
        let existingHistories = campaignHistory.find({ campaign_id: id, medium_type: mediumType }).exec();
        return existingHistories;
    } catch (err) {
        throw err;
    }
}

async function updateHistoryById(id, data) {
    try {
        const history = await campaignHistory.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        ).exec();
        return history;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertHistory,
    getAllHistory,
    getHistoryById,
    getHistoryByCampaignId,
    getHistoryByReferrerId,
    getHistoryByCampaignIdAndReferrerId,
    getHistoryByCampaignIdAndMediumType,
    updateHistoryById
};