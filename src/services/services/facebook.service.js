async function getContactList(data) {
    // Check data info: data is req.body
    // return a array of contactlist
    let result=[];
    return result;
}

async function sendMessage(data) {
    // Check data.contactList: data is req.body
    // return a array of true or false with contact list (sucessfully sent or not)
    let result=[];

    const PAGE_ACCESS_TOKEN = 'page_access_token'

    for (let chatId of data.contactList) {
        let url = 'https://graph.facebook.com/v14.0/me/messages';
        url += `?access_token=${PAGE_ACCESS_TOKEN}`;

        const body = {
            recipient: {
                id: chatId
            },
            message: {
                text: data.message
            }
        }

        const response = await fetch(url, {method: 'post', body: JSON.stringify(body)});
        const resultPerMsg = response.json();

        result.push(resultPerMsg);
    }

    return result;
}

module.exports = {
    getContactList,
    sendMessage
};
