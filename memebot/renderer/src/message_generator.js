"use strict";

function create_fragment(html_string) {
  return document.createRange().createContextualFragment(html_string);
}

function create_group_start(author_name, author_color, author_avatar_url, time_string, message_content) {
  return create_fragment(
`<div class="message-2qnXI6 cozyMessage-3V1Y8y groupStart-23k01U wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica">
    <div class="contents-2mQqc9"><img src="${author_avatar_url}" class="avatar-1BDn8e clickable-1bVtEA">
        <h2 class="header-23xsNx"><span class="headerText-3Uvj1Y"><span class="username-1A8OIy clickable-1bVtEA" style="color: ${author_color};">${author_name}</span></span><span class="timestamp-3ZCmNB">${time_string}</span></h2>
        ${create_content_string(message_content)}
    </div>
</div>
`
  );
}

function create_message(message_content) {
  return create_fragment(
`<div class="message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica">
    ${create_content_string(message_content)}
</div>
`
  );
}

function create_content_string(message_content) {
  return `<div class="markup-2BOw-j messageContent-2qWWxC">${message_content}</div>`;
}

function main() {
  var messages_container = document.getElementById('messages-container');
  messages_container.append(create_group_start(
    'alexjuuhh', '#1abc9c', 'https://cdn.discordapp.com/avatars/128573188589355008/a_6dc237ba7dfe9f6295158b05212c8721.webp?size=256',
    'Today at 2:32 PM', 'omg'
  ));
  messages_container.append(create_message(
    'you know how with some bots you can generate memes'
  ));
  messages_container.append(create_group_start(
    'Kobus', '#2ecc71', 'https://cdn.discordapp.com/avatars/219116794164543488/661132d2d1326641b62434244319920e.webp?size=256',
    'Today at 2:32 PM', 'am i the bot in this scenario'
  ));
}

main();
