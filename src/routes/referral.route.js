const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign.controller');
const historyController = require('../controllers/history.controller');
const whatsappController = require('../controllers/social/whatsapp.controller');
const telegramController = require('../controllers/social/telegram.controller');
const facebookController = require('../controllers/social/facebook.controller');
const twitterController = require('../controllers/social/twitter.controller');
const tiktokController = require('../controllers/social/tiktok.controller');

// /* GET programming languages. */
// router.get('/', programmingLanguagesController.get);
  
// /* POST programming language */
// router.post('/', programmingLanguagesController.create);

// /* PUT programming language */
// router.put('/:id', programmingLanguagesController.update);

// /* DELETE programming language */
// router.delete('/:id', programmingLanguagesController.remove);

//Campaign
router.post('/createCampaign', campaignController.create);
router.get('/getCampaignById/:campaignId', campaignController.getCampaignById);
router.get('/getAllCampaign', campaignController.getAllCampaign);
router.put('/updateCampaignById/:campaignId', campaignController.updateCampaignById);

//History
router.post('/createHistory', historyController.create);
router.get('/getAllHistory', historyController.getAllHistory);
router.get('/getHistoryById/:historyId', historyController.getHistoryById);
router.get('/getHistoryByCampaignId/:campaignId', historyController.getHistoryByCampaignId);
router.get('/getHistoryByReferrerId/:referrerId', historyController.getHistoryByReferrerId);
router.post('/getHistoryByCampaignIdAndReferrerId', historyController.getHistoryByCampaignIdAndReferrerId);
router.post('/getHistoryByCampaignIdAndMediumType', historyController.getHistoryByCampaignIdAndMediumType);
router.put('/updateHistoryById/:historyId', historyController.updateHistoryById);

//Get contactlist
router.post('/getContactList/facebook', facebookController.getContactList);
router.post('/getContactList/twitter', twitterController.getContactList);
router.post('/getContactList/telegram', telegramController.getContactList);
router.post('/getContactList/whatsapp', whatsappController.getContactList);
router.post('/getContactList/tiktok', tiktokController.getContactList);

//Send message
router.post('/sendMessage/facebook', facebookController.sendMessage);
router.post('/sendMessage/twitter', twitterController.sendMessage);
router.post('/sendMessage/telegram', telegramController.sendMessage);
router.post('/sendMessage/whatsapp', whatsappController.sendMessage);
router.post('/sendMessage/tiktok', tiktokController.sendMessage);

module.exports = router;
