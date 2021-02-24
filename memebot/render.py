import base64
from io import BytesIO
import json
import logging
from pathlib import Path
from subprocess import PIPE, Popen
from typing import *
from typing import BinaryIO

__all__ = ['render_messages']

logger = logging.getLogger('memebot.render')

renderer_script_path = Path(__file__, '../renderer/main.js').absolute()


def render_messages(message_data: Dict) -> Optional[BinaryIO]:
    proc = Popen(
        ['node', str(renderer_script_path), json.dumps(message_data)],
        stdout=PIPE
    )
    out, err = proc.communicate()
    if err:
        logger.error(f"Renderer process failed: {err}")
        return None
    if len(out) == 0:
        logger.error("Empty image data")
        return None
    return BytesIO(base64.b64decode(out))
