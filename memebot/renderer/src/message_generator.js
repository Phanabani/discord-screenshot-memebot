"use strict";

function create_fragment(html_string) {
  return document.createRange().createContextualFragment(html_string);
}

function get_content_string(message_content) {
  return `<div class="markup-2BOw-j messageContent-2qWWxC">${message_content}</div>`;
}

function add_group_start(parent, author_name, author_color, author_avatar_url, time_string, message_content) {
  parent.add(create_fragment(`
    <div class="message-2qnXI6 cozyMessage-3V1Y8y groupStart-23k01U wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica">
        <div class="contents-2mQqc9"><img src="${author_avatar_url}" class="avatar-1BDn8e clickable-1bVtEA">
            <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA" style="color: ${author_color};">${author_name}</span></span><span class="timestamp-3ZCmNB">${time_string}</span></h2>
            ${get_content_string(message_content)}
        </div>
    </div>
  `));
}

function add_message(parent, message_content) {
  parent.add(create_fragment(`
    <div class="message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica">
        ${get_content_string(message_content)}
    </div>
  `));
}
