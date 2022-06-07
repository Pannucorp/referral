const express = require('express');

const app = express();
const PORT = 3000;

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';
// var url = 'mongodb://mongodb:27017/';
var dbo;
MongoClient.connect(url, function (err, db) {
    console.log("DB connected");
    dbo = db.db("Referral");
})

/*
id
content
sent_at
created_by
*/

function insertCampaign(data) {
    dbo.collection("campaigns").insertOne(data, function (err, res) {
        if (err) {
            res.send(500).json(err);
            throw err;
        }
        console.log("1 campaign document inserted");
        res.status(200);
    });
}

/*
id
campaign_id
medium_type
sent
clicked
signed
earned
*/

function insertMedium(data) {
    dbo.collection("mediums").insertOne(data, function (err, res) {
        if (err) {
            res.send(500).json(err);
            throw err;
        }
        console.log("1 medium document inserted");
        // db.close();
    });
}

function updateMedium(data) {
    let myquery = {
        campaign_id: data['campaign_id'],
        medium_type: data['medium_type']
    };
    let newvalues = { $set: { sent: data['sent'], clicked: data['clicked'], signed: data['signed'] } };
    dbo.collection("mediums").updateOne(myquery, newvalues, function (err, res) {
        if (err) {
            res.send(500).json(err);
            throw err;
        }
        console.log("1 review updated");
    });
}

function getAllCampaign() {
    dbo.collection("campaigns").find({}).toArray(function (err, result) {
        if (err) {
            res.send(500).json(err);
            throw err;
        }
        // console.log(result);
        return result;
    });
}

function getCampaignByID(id) {
    dbo.collection("campaigns").findById(ObjectId(id)).toArray(function (err, result) {
        if (err) {
            res.send(500).json(err);
            throw err;
        }
        // console.log(result);
        return result;
    });
}

function getMediumByCampaignID(id) {
    let myquery = {
        campaign_id: id
    };
    dbo.collection("mediums").find(myquery).toArray(function (err, result) {
        if (err) {
            res.send(500).json(err);
            throw err;
        }
        // console.log(result);
        return result;
    })
}

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
            referralWithWhatsapp(user, content, receiverList);
            break;
        };
        case 1: {
            referralWithTelegram(user, content, receiverList);
            break;
        };
        case 2: {
            referralWithFacebook(user, content, receiverList);
            break;
        };
        case 3: {
            referralWithTwitter(user, content, receiverList);
            break;
        };
        case 4: {
            referralWithTiktok(user, content, receiverList);
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
        let receiverList = ['all'];
        for (let i = 0; i < order.length; i++) {
            if (user[order[i]] && user[order[i]] != '') {
                send(user, content, i, receiverList);
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

app.get('/referral/getAllCampaign', (req, res) => {
    res.status(200).send(getAllCampaign());
});

app.get('/referral/getCampaignByID/:campaignId', (req, res) => {
    res.status(200).send(getCampaignByID(req.params.campaignId));
});

app.get('/referral/getMediumByCampaignID/:campaignId', (req, res) => {
    res.status(200).send(getMediumByCampaignID(req.params.campaignId));
});

app.post('/referral/createCampaign', (req, res) => {
    insertCampaign(req.body);
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is running on " + PORT + "port");
    else
        console.log("Error occurred, server can't start", error);
}
);

// send("Jason", "Test Message", 2);