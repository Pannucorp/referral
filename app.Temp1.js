const express = require('express');
const http = require('http');
const cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;


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
    referrel_code: {
        type: Number,
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

async function insertHistory(data) {
    try {
        const history = new campaignHistory({
            ...data,
        });
        let newHistory = await history.save();
        console.log("1 history document inserted");
        return newHistory;
    } catch (err) {
        return err;
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


async function updateHistoryById(id, data){
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



async function insertMedium(data) {
    try {
        const medium = new Medium({
            ...data,
        });
        let newMedium = await medium.save();
        console.log("1 medium document inserted");
        return newMedium;
    } catch (err) {
        return err;
    }
}

function getMediumByCampaignId(id) {
    try {
        let existingMediums = Medium.find({ campaign_id: id }).exec();
        return existingMediums;
    } catch (err) {
        return err;
    }
}

function getMediumById(id) {
    try {
        let existingMedium = Medium.find({ _id: id }).exec();
        return existingMedium;
    } catch (err) {
        return err;
    }
}

async function updateMediumById(id, data) {
    try {
        const medium = await Medium.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        ).exec();
        return medium;
    } catch (err) {
        return err;
    }
}

// function updateMedium(data) {
//     let myquery = {
//         campaign_id: data['campaign_id'],
//         medium_type: data['medium_type']
//     };
//     let newvalues = { $set: { sent: data['sent'], clicked: data['clicked'], signed: data['signed'] } };
//     dbo.collection("mediums").updateOne(myquery, newvalues, function (err, res) {
//         if (err) {
//             res.send(500).json(err);
//             throw err;
//         }
//         console.log("1 review updated");
//     });
// }


let order = [
    "whatsapp",
    "telegram",
    "facebook",
    "twitter",
    "tiktok"
];

function referralWithWhatsapp(user, content, receiverList) {
    if (reciverList[0] == "all") {
        console.log("send a message to all contacts by whatsapp");
    } else {
        for (let i = 0; i < receiverList.length; i++) {
            console.log("send a direct message to " + receiverList[i] + " by whatsapp");
        }
    }
}

function referralWithTelegram(user, content) {
    if (reciverList[0] == "all") {
        console.log("send a message to all contacts by telegram");
    } else {
        for (let i = 0; i < receiverList.length; i++) {
            console.log("send a direct message to " + receiverList[i] + " by telegram");
        }
    }
}

function referralWithFacebook(user, content) {
    if (reciverList[0] == "all") {
        console.log("send a message to all contacts by facebook");
    } else {
        for (let i = 0; i < receiverList.length; i++) {
            console.log("send a direct message to " + receiverList[i] + " by facebook");
        }
    }
}

function referralWithTwitter(user, content) {
    if (reciverList[0] == "all") {
        console.log("send a message to all contacts by twitter");
    } else {
        for (let i = 0; i < receiverList.length; i++) {
            console.log("send a direct message to " + receiverList[i] + " by twitter");
        }
    }
}

function referralWithTiktok(user, content) {
    if (reciverList[0] == "all") {
        console.log("send a message to all contacts by tiktok");
    } else {
        for (let i = 0; i < receiverList.length; i++) {
            console.log("send a direct message to " + receiverList[i] + " by tiktok");
        }
    }
}

function send(user, content, i, receiverList) {
    switch (i) {
        case 0: {
            return referralWithWhatsapp(user, content, receiverList);
            break;
        };
        case 1: {
            return referralWithTelegram(user, content, receiverList);
            break;
        };
        case 2: {
            return referralWithFacebook(user, content, receiverList);
            break;
        };
        case 3: {
            return referralWithTwitter(user, content, receiverList);
            break;
        };
        case 4: {
            return referralWithTiktok(user, content, receiverList);
            break;
        };
        default: {
            return 0;
        }
    }
}

app.post('/referral/getContacts', (req, res) => {

})

app.post('/referral/send/all', (req, res) => {
    if (req.body && req.body.user_id && req.body.message) {
        //get user info from registeration module.
        let user = {
            'name': 'Jason Lee',
            'phone': '+14158004073',
            'email': 'jason.l@pannucorp.com',
            'telegram': '@SatoshiBES'
        }
        let content = "This message was sent by" + user['name'] + ".";
        let data = {
            content: req.body.message,
            sent_at: new Date(),
            created_by: req.body.user_id,
        }
        insertCampaign(data)

        let receiverList = ['all'];
        for (let i = 0; i < order.length; i++) {
            if (user[order[i]] && user[order[i]] != '') {
                let rlt = send(user, content, i, rxeceiverList);
            }
        }
    } else {
        res.status(400).send({
            errors: ['Missing required fields: user_id, message'],
        });
    }
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.post('/referral/send/direct', (req, res) => {
    if (req.body && req.body.user_id && req.body.message && req.body.receiverList) {
        //get user info from registeration module.
        let user = {
            'name': 'Jason Lee',
            'phone': '+14158004073',
            'email': 'jason.l@pannucorp.com',
            'telegram': '@SatoshiBES'
        }
        let content = "This message was sent by" + user['name'] + ".";
        for (let i = 0; i < order.length; i++) {
            if (user[order[i]] && user[order[i]] != '') {
                send(user, content, i);
            }
        }
    } else {
        res.status(400).send({
            errors: ['Missing required fields: user_id, message'],
        });
    }
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.get('/referral/getMediumByCampaignId/:campaignId', async (req, res) => {
    try {
        if (req.params.campaignId) {
            res.status(200).send(await getMediumByCampaignId(req.params.campaignId));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/referral/getMediumById/:mediumId', async (req, res) => {
    try {
        if (req.params.mediumId) {
            res.status(200).send(await getMediumById(req.params.mediumId));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/referral/updateMediumById/:mediumId', async (req, res) => {
    try {
        if (req.params.mediumId && req.body) {
            res.status(200).send(await updateMediumById(req.params.mediumId, req.body));
        } else {
            res.status(400).send({
                'content': 'contents are missing'
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/referral/createCampaign', async (req, res) => {
    try {
        if (req.body && req.body.content && req.body.created_by) {
            let data = {
                content: req.body.content,
                created_at: new Date().toISOString(),
                created_by: req.body.created_by
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