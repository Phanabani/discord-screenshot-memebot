import json
import logging
from pathlib import Path
import sys

from . import Memebot

logger = logging.getLogger('memebot')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter(
    '%(asctime)s|%(levelname)s|%(name)s|%(message)s'
))
logger.addHandler(handler)

with Path(__file__, '../config.json').open() as f:
    bot_token = json.load(f)['bot_token']

bot = Memebot()
bot.run(bot_token)
