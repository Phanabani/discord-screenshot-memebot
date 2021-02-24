"use strict";

function createFragment(htmlString) {
    return document.createRange().createContextualFragment(htmlString);
}

function getContentString(messageContent) {
    return `<div class="markup-2BOw-j messageContent-2qWWxC">${messageContent}</div>`;
}

function addGroupStart(parent, authorName, authorColor, authorAvatarUrl, timestamp, messageContent) {
    const timeString = transformTimestamp(timestamp);
    parent.appendChild(createFragment(`
        <div class="message-2qnXI6 cozyMessage-3V1Y8y groupStart-23k01U wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica">
            <div class="contents-2mQqc9"><img src="${authorAvatarUrl}" class="avatar-1BDn8e clickable-1bVtEA">
                <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA" style="color: ${authorColor};">${authorName}</span></span><span class="timestamp-3ZCmNB">${timeString}</span></h2>
                ${getContentString(messageContent)}
            </div>
        </div>
    `));
}

function addMessage(parent, messageContent) {
    parent.appendChild(createFragment(`
        <div class="message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica">
            ${getContentString(messageContent)}
        </div>
    `));
}

function transformTimestamp(timestamp) {
    const now = dayjs();
    const then = dayjs(timestamp);
    if (now.year() !== then.year() || now.month() !== then.month()) {
        return now.format('YYYY-MM-DD');
    } else if (then.day() === now.day()) {
        return `Today at ${then.format('HH:mm')}`;
    } else if (then.day() === now.day() - 1) {
        return `Yesterday at ${then.format('HH:mm')}`;
    } else {
        return now.format('YYYY-MM-DD');
    }
}

function addMessages(messageData) {
    const authors = messageData.authors;
    const msgs = messageData.messages;
    const messagesContainer = document.getElementById('messages-container');

    let lastAuthor = null;
    for (let msg of msgs) {
        let author = authors[msg.author];
        if (lastAuthor === null || author !== lastAuthor) {
            addGroupStart(
                messagesContainer, author.name, author.color, author.avatarUrl,
                msg.timestamp, msg.content
            );
        } else {
            addMessage(messagesContainer, msg.content);
        }
        lastAuthor = author;
    }
}
