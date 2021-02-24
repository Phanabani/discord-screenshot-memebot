import logging
import sys
from typing import *

import discord
import discord.ext.commands as commands

from .render import render_messages

logger = logging.getLogger('memebot')


class Memebot(commands.Bot):

    def __init__(self):

        intents = discord.Intents(
            guilds=True,
            members=True,
            messages=True
        )
        allowed_mentions = discord.AllowedMentions(users=True)
        activity = discord.Game(f'XD <command>')

        super().__init__(
            # Client params
            max_messages=None,
            intents=intents,
            allowed_mentions=allowed_mentions,
            activity=activity,
            # Bot params
            command_prefix='XD ',
            description='Makes memes',
        )
        self.add_cog(MemeGenerators(self))

    async def on_connect(self):
        logger.info('Client connected')

    async def on_disconnect(self):
        logger.info('Client disconnected')

    async def on_resumed(self):
        logger.info('Session resumed')

    async def on_ready(self):
        logger.info('Client started')

    async def on_error(self, event_method: str, *args, **kwargs):
        exc_type, __, __ = sys.exc_info()

        if exc_type is discord.HTTPException:
            logger.warning('HTTP exception', exc_info=True)
        elif exc_type is discord.Forbidden:
            logger.warning('Forbidden request', exc_info=True)

        elif event_method == 'on_message':
            msg: discord.Message = args[0]
            logger.error(
                f'Unhandled in on_message (content: {msg.content!r} '
                f'author: {msg.author} channel: {msg.channel})',
                exc_info=True
            )
        else:
            logger.error(
                f"Unhandled in {event_method} (args: {args} kwargs: {kwargs})",
                exc_info=True
            )


class MemeGenerators(commands.Cog):

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @commands.command()
    async def lie(
            self, ctx: commands.Context, message_start: commands.MessageConverter,
            message_end: Optional[commands.MessageConverter]
    ):
        logger.info(f"Generating image (start={message_start} end={message_end})")

        message_start: discord.Message
        messages = [message_start]
        if message_end is not None:
            messages.extend(
                await cast(discord.TextChannel, message_start.channel)
                    .history(after=message_start, before=message_end,
                             oldest_first=True)
                    .flatten()
            )
            messages.append(message_end)

        message_data = {'authors': {}, 'messages': []}
        for m in messages:
            if str(m.author.id) not in message_data['authors']:
                message_data['authors'][str(m.author.id)] = {
                    'name': m.author.nick,
                    'color': '#' + hex(m.author.color.value)[2:],
                    'avatarUrl': str(m.author.avatar_url)
                }
            message_data['messages'].append({
                'author': str(m.author.id),
                'timestamp': m.created_at.isoformat(),
                'content': m.content
            })

        image = render_messages(message_data)
        if image is not None:
            logger.info("Sending image")
            file = discord.File(image, 'lie.jpg')
            await ctx.send(file=file)
        else:
            logger.info("No image generated")
