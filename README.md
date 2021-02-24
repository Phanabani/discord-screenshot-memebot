# Discord Screenshot Memebot

A Discord bot that generates memes with pseudo-Discord chat screenshots.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [License](#license)

## Installation

Install [Node](https://nodejs.org) and [Python](https://python.org).

In the root directory, create a Python virtual environment and install
dependencies from [requirements.txt](requirements.txt).

```shell script
python -m venv venv

source venv/bin/activate
# or
venv\Scripts\activate.bat

pip install -r requirements.txt
```

Enter [memebot/renderer](memebot/renderer) and install yarn dependencies.

```shell script
yarn install
```

## Usage

In the [memebot](memebot) directory, create a `config.json` and add your Discord
bot token:

```json
{
    "bot_token": "YOUR_BOT_TOKEN"
}
```

Then from the root directory, start the bot:

```shell script
python -m memebot
```

## Commands

You can right click a message and click `Copy message link` to get a link to
that message. This is important for most commands below.

Command | Description
------- | -----------
`XD lie <message_start> [message_end]` | Create a "so that was a f-ing lie" meme starting at the given message and optionally ending at a second message.

## Licence

[MIT © Hawkpath.](LICENSE)
