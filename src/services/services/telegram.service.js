const apiId = 17825635;
const apiHash = "650eb45f393b416890228386fcfc42ea";

const { Client } = require('tdl')
const { TDLib } = require('tdl-tdlib-addon')

const client = new Client(new TDLib(), {
  apiId: apiId,
  apiHash: apiHash
})

async function connectToTelegram(data) {
    if (data.phone === undefined || data.phone === null) return false;
        return false;

    await client.connect();
    await client.login(() => ({
        getPhoneNumber: retry => retry
            ? Promise.reject('Invalid phone number')
            : Promise.resolve(data.phone),
        getAuthCode: retry => retry
            ? Promise.reject('Invalid auth code')
            : Promise.resolve('')
    }))    
}

async function getContactList(data) {
    // Check data info: data is req.body
    // return a array of contactlist
    const isConnected = await connectToTelegram(data);
    if (!isConnected)
        return [];

    const contacts = await client.invoke({
        _: 'getChats',
        chat_list: { _: 'chatListMain' },
        limit: 4000
    });

    let result = [];
    for (let chatId of contacts.chat_ids) {
        result.push(chatId);
    }

    return result;
}

async function sendMessage(data) {
    // Check data.contactList: data is req.body
    // return a array of true or false with contact list (sucessfully sent or not)
    /*const isConnected = await connectToTelegram(data);
    if (!isConnected)
        return [];*/

    let result = [];
    for (let chatId of data.contactList) {
        if (chatId < 0) continue;

        const resultPerMsg = await client.invoke({
            _: 'sendMessage',
            chat_id: chatId,
            input_message_content: {
                _: data.message,
                text: {
                    _: 'formattedText',
                    text: 'sorry, this is test message for my telegram app'
                }
            }
        });

        result.push(resultPerMsg);
    }

    return result;
}

module.exports = {
    getContactList,
    sendMessage
};