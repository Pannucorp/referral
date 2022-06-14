const express = require('express');
const http = require('http');
const cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const referralRouter = require('./src/routes/referral.route');

let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
};

mongoose
    .connect('mongodb://localhost:27017/Referral', mongooseOptions)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


const mediumTypes = ['whatsapp', 'telegram', 'twitter', 'facebook', 'tiktok'];

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

const mediumSchema = new mongoose.Schema({
    campaign_id: {
        type: String,
        required: true
    },
    medium_type: {
        type: String,
        required: true
    },
    sent: {
        type: Number,
        required: true,
    },
    clicked: {
        type: Number,
        required: true,
    },
    signed: {
        type: Number,
        required: true,
    },
    earned: {
        type: Number,
        required: true,
    }
})

Medium = mongoose.model('mediums', mediumSchema);

async function insertCampaign(data) {
    try {
        const campaign = new Campaign({
            ...data,
        });
        let newCampaign = await campaign.save();
        console.log("1 campaign document inserted");
        return newCampaign;
    } catch (err) {
        return err;
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
        return err;
    }
}

async function getAllCampaign() {
    try {
        let existingCampaigns = Campaign.find().exec();
        return existingCampaigns;
    } catch (err) {
        return err;
    }
}

async function getCampaignById(id) {
    try {
        let existingCampaign = Campaign.findOne({ _id: id }).exec();
        return existingCampaign;
    } catch (err) {
        return err;
    }
}

async function insertHistory(data) {
    try {
        const history = new campaignHistory({
            ...data,
        });
        let newHistory = await history.save();
        console.log("1 history document inserted");
        return true;
    } catch (err) {
        return false;
    }
}

async function getAllHistory() {
    try {
        let existingHistories = campaignHistory.find().exec();
        return existingHistories;
    } catch (err) {
        return err;
    }
}

async function getHistoryById(id) {
    try {
        let existingHistory = campaignHistory.findOne({ _id: id }).exec();
        return existingHistory;
    } catch (err) {
        return err;
    }
}

async function getHistoryByCampaignId(id) {
    try {
        let existingHistories = campaignHistory.find({ campaign_id: id }).exec();
        return existingHistories;
    } catch (err) {
        return err;
    }
}

async function getHistoryByReferrerId(id) {
    try {
        let existingHistories = campaignHistory.find({ referrer_id: id }).exec();
        return existingHistories;
    } catch (err) {
        return err;
    }
}

async function getHistoryByCampaignIdAndReferrerId(campaign_id, referrer_id) {
    try {
        let existingHistories = campaignHistory.find({ campaign_id: campaign_id, referrer_id: referrer_id }).exec();
        return existingHistories;
    } catch (err) {
        return err;
    }
}

async function getHistoryByCampaignIdAndMediumType(id, mediumType) {
    try {
        let existingHistories = campaignHistory.find({ campaign_id: id, medium_type: mediumType }).exec();
        return existingHistories;
    } catch (err) {
        return err;
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
        return err;
    }
}

function sendReferralWithWhatsapp(data) {
    return true;
}

function sendReferralWithTelegram(data) {
    return true;
}

function sendReferralWithFacebook(data) {
    return true;
}

function sendReferralWithTwitter(data) {
    return true;
}

function sendReferralWithTiktok(data) {
    return true;
}

function getContactsByIdWithWhatsapp(referrer_id) {
    //get info from registeration module with referrer_id
    return [];
}

function getContactsByIdWithTelegram(referrer_id) {
    return [];
}

function getContactsByIdWithFacebook(referrer_id) {
    return [];
}

function getContactsByIdWithTwitter(referrer_id) {
    return [];
}

function getContactsByIdWithTiktok(referrer_id) {
    return [];
}

function sendMessage(data) {
    switch (data['medium_type']) {
        case 'whatsapp': {
            return sendReferralWithWhatsapp(data);
            break;
        };
        case 'telegram': {
            return sendReferralWithTelegram(data);
            break;
        };
        case 'facebook': {
            return sendReferralWithFacebook(data);
            break;
        };
        case 'twitter': {
            return sendReferralWithTwitter(data);
            break;
        };
        case 'tiktok': {
            return sendReferralWithTiktok(data);
            break;
        };
        default: {
            return false;
        }
    }
}

function getContacts(id, medium_type) {
    switch (medium_type) {
        case 'whatsapp': {
            return getContactsByIdWithWhatsapp(id);
            break;
        };
        case 'telegram': {
            return getContactsByIdWithTelegram(id);
            break;
        };
        case 'facebook': {
            return getContactsByIdWithFacebook(id);
            break;
        };
        case 'twitter': {
            return getContactsByIdWithTwitter(id);
            break;
        };
        case 'tiktok': {
            return getContactsByIdWithTiktok(id);
            break;
        };
        default: {
            return false;
        }
    }
}

/*
campaign_id
medium_type
contact_list
referrer_id
referral_code
referrer_earn
receiver_earn
note
*/

app.post('/referral/send', async (req, res) => {
    if (req.body && req.body.campaign_id && req.body.medium_type && req.body.contact_list && req.body.referrer_id && req.body.referral_code && req.body.referrer_earn && req.body.receiver_earn && req.body.note) {
        //get user info from registeration module.
        let rlt = [];
        for (let i = 0; i < req.body.contact_list.length; i++) {
            let data = {
                campaign_id: req.body.campaign_id,
                medium_type: req.body.medium_type,
                identifier: req.body.contact_list[i],
                referrer_id: req.body.referrer_id,
                referral_code: req.body.referral_code,
                referrer_earn: req.body.referrer_earn,
                receiver_earn: req.body.receiver_earn,
                note: req.body.note
            }
            if (await sendMessage(data)) {
                rlt[i] = insertHistory(data);
            } else {
                rlt[i] = false;
            }
        }
        res.status(200).send(rlt);
    } else {
        res.status(400).send({
            errors: ['Missing required fields: user_id, message'],
        });
    }
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.post('/referral/getContacts', async (req, res) => {
    try {
        if (req.body && req.body.medium_type && req.body.referrer_id) {
            res.status(200).send(await getContacts(req.body.referrer_id, req.params.medium_type));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

app.post('/referral/createCampaign', async (req, res) => {
    try {
        if (req.body && req.body.content && req.body.created_by && req.body.total_price && req.body.referrer_price && req.body.day) {
            let data = {
                content: req.body.content,
                created_at: new Date().toISOString(),
                created_by: req.body.created_by,
                total_price: req.body.total_price,
                referrer_price: req.body.referrer_price,
                day: req.body.day
            }
            res.status(200).send(await insertCampaign(data));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }
    }
    catch (err) {
        res.status(400).send({
            'err': err
        })
    }
});

app.put('/referral/updateCampaignById/:campaignId', async (req, res) => {
    try {
        if (req.params.campaignId && req.body) {
            res.status(200).send(await updateCampaignById(req.params.campaignId, req.body));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/referral/getCampaignById/:campaignId', async (req, res) => {
    try {
        if (req.params.campaignId) {
            res.status(200).send(await getCampaignById(req.params.campaignId));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/referral/getAllCampaign', async (req, res) => {
    try {
        res.status(200).send(await getAllCampaign());
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/referral/createHistory', async (req, res) => {
    try {
        if (req.body && req.body.campaign_id && req.body.medium_type && req.body.identifier && req.body.referrer_id) {
            res.status(200).send(await insertHistory(req.body));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }
    }
    catch (err) {
        res.status(400).send({
            'err': err
        })
    }
});

app.get('/referral/getAllHistory', async (req, res) => {
    try {
        res.status(200).send(await getAllHistory());
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/referral/getHistoryById/:historyId', async (req, res) => {
    try {
        if (req.params.historyId) {
            res.status(200).send(await getHistoryById(req.params.historyId));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/referral/getHistoryByCampaignId/:campaignId', async (req, res) => {
    try {
        if (req.params.campaignId) {
            res.status(200).send(await getHistoryByCampaignId(req.params.campaignId));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/referral/getHistoryByReferrerId/:referrerId', async (req, res) => {
    try {
        if (req.params.referrerId) {
            res.status(200).send(await getHistoryByReferrerId(req.params.referrerId));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/referral/getHistoryByCampaignIdAndReferrerId', async (req, res) => {
    try {
        if (req.body && req.body.campaign_id && req.body.referrer_id) {
            res.status(200).send(await getHistoryByCampaignIdAndReferrerId(req.body.campaign_id, req.body.referrer_id));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/referral/getHistoryByCampaignIdAndMediumType', async (req, res) => {
    try {
        if (req.body && req.body.campaign_id && req.body.medium_type) {
            res.status(200).send(await getHistoryByCampaignIdAndMediumType(req.body.campaign_id, req.body.medium_type));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/referral/updateHistoryById/:historyId', async (req, res) => {
    try {
        if (req.params.historyId && req.body) {
            res.status(200).send(await updateHistoryById(req.params.historyId, req.body));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use('/referral', referralRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});

server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Running server on port %s', PORT);
});

// app.listen(PORT, (error) => {
//     if (!error)
//         console.log("Server is running on " + PORT + "port");
//     else
//         console.log("Error occurred, server can't start", error);
// }
// );

// send("Jason", "Test Message", 2);