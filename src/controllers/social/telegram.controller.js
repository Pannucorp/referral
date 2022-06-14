const telegramService = require('../services/social/telegram.service');

async function getContactList(req, res, next) {
    try {
        res.json(await telegramService.getContactList(req.body));
    } catch (err) {
        console.error(`Error `, err.message);
        next(err);
    }
}

async function sendMessage(req, res, next) {
    try {
        let sendResult = await telegramService.sendMessage(req.body);
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