const express = require('express');
const http = require('http');
const cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const referralRouter = require('./src/routes/referral.route');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const mediumTypes = ['whatsapp', 'telegram', 'twitter', 'facebook', 'tiktok'];

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