require('dotenv').config({path: __dirname + '/../../.env'});

const VONAGE_API_KEY = process.env.VONAGE_API_KEY
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID
const VONAGE_APPLICATION_PRIVATE_KEY_PATH = __dirname +"/../../"+ process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH

const BASE_URL = process.env.BASE_URL

const Vonage = require('@vonage/server-sdk')
const WhatsAppText = require('@vonage/server-sdk/lib/Messages/WhatsAppText');

const vonage = new Vonage({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
  applicationId: VONAGE_APPLICATION_ID,
  privateKey: VONAGE_APPLICATION_PRIVATE_KEY_PATH
}, {
  apiHost: BASE_URL
})

async function getContactList(data) {
    // Check data info: data is req.body
    // return a array of contactlist
    let result = [];
    return result;
}

async function sendMessage(data) {
    // Check data.contactList: data is req.body
    // return a array of true or false with contact list (sucessfully sent or not)
    if (data.from === undefined || data.from === null) return [];
    if (data.text === undefined || data.text === null) return [];
    
    let result = [];
    for (let toPhoneNumber of data.contactList) {
        if (toPhoneNumber === undefined || toPhoneNumber === null || toPhoneNumber === '') continue;

        vonage.messages.send(
            new WhatsAppText(
                data.text
                toPhoneNumber,
                data.from
            ),
            (err, data) => {
                if (err) {
                    result.push(false);
                } else {
                    // console.log(data.message_uuid);
                    result.push(true);
                }
            }
        );
    }
}

module.exports = {
    getContactList,
    sendMessage
};