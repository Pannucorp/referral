const twitterService = require('../services/social/twitter.service');

async function getContactList(req, res, next) {
    try {
        res.json(await twitterService.getContactList(req.body));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function sendMessage(req, res, next) {
    try {
        let sendResult = await twitterService.sendMessage(req.body);
        for(let i=0;i<sendResult.length;i++){
            //adding to history
        }
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}


module.exports = {
    getContactList,
    sendMessage,
};