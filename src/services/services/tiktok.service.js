const { FormData } = require('formdata-node');
const blobFrom = require('fetch-blob/from');

async function getContactList(data) {
    // Check data info: data is req.body
    // return a array of contactlist
    let result=[];
    return result;
}

async function sendMessage(data) {
    // Check data.contactList: data is req.body
    // return a array of true or false with contact list (sucessfully sent or not)

    const openId = '';
    const accessToken = '';

    // Note: `data.message` should be the file path

    let result=[];

    let url = 'https://open-api.tiktok.com/share/video/upload/';
    url += `?open_id=${openId}`;
    url += `&access_token=${accessToken}`;

    const form = new FormData();
    const file = blobFrom(data.message);
    form.set('video', file);

    const response = await fetch(url, {method: 'post', body: form});
    const resultPerMsg = response.json();

    result.push(resultPerMsg)

    return result;
}

module.exports = {
    getContactList,
    sendMessage
};
