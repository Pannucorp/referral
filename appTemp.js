const express = require('express');
const http = require('http');
const cors = require('cors');
var bodyParser = require('body-parser');

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

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

/*
id
content
sent_at
created_by
*/

const mediums = ['whatsapp', 'telegram', 'twitter', 'facebook', 'tiktok'];

function insertCampaign(data) {
    dbo.collection("campaigns").insertOne(data, function (err, res) {
        if (err) {
            return err;
        }
        console.log("1 campaign document inserted", res['insertedId']);
        for (let i = 0; i < mediums.length; i++) {
            let mediumData = {
                campaign_id: res['insertedId'],
                medium_type: mediums[i],
                sent: 0,
                clicked: 0,
                signed: 0,
                earned: 0
            }
            insertMedium(mediumData);
        }
        return 200;
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
            return err;
        }
        console.log("1 medium document inserted");
        return 200;
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

// async function getAllCampaign() {
//     await dbo.collection("campaigns").find({}).toArray(function (err, result) {
//         if (err) {
//             return err;
//         }
//         // console.log(result);
//         return result;
//     });
// }

function getCampaignByID(id) {
    var query = { _id: new Object(id) };
    dbo.collection("campaigns").find(query).toArray(function (err, result) {
        if (err) {
            return err;
            // throw err;
        }
        console.log(result);
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


app.get('/referral/getCampaignByID/:campaignId', (req, res) => {
    res.status(200).send(getCampaignByID(req.params.campaignId));
});

app.get('/referral/getMediumByCampaignID/:campaignId', (req, res) => {
    res.status(200).send(getMediumByCampaignID(req.params.campaignId));
});

/*
id
content
sent_at
created_by
*/
app.post('/referral/createCampaign', (req, res) => {
    try {
        if (req.body && req.body.content && req.body.sent_at && req.body.created_by) {
            let data = {
                content: req.body.content,
                sent_at: req.body.sent_at,
                created_by: req.body.created_by
            }
            res.status(200).send(insertCampaign(data));
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

app.get('/referral/getAllCampaign', async (req, res) => {
    try {
        await dbo.collection("campaigns").find({}).toArray(function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
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