const path = require('path');
const puppeteer = require('puppeteer');

const REDIRECT_PUPPETEER_CONSOLE = false;
const DEBUG_SCREENSHOT = false;

async function generateScreenshot(messageData) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({
    width: 1920,
    height: 1080,
    // I'm not sure how to dynamically set this... it's set according to my
    // 150% scaling in Windows
    deviceScaleFactor: 1.5
  });

  // Redirect console output for testing
  if (REDIRECT_PUPPETEER_CONSOLE) {
      page
          .on('console', message =>
              console.log(`<${message.type().substr(0, 3).toUpperCase()}> ${message.text()}`))
          .on('pageerror', ({ message }) => console.log(message))
          // .on('response', response =>
          //     console.log(`${response.status()} ${response.url()}`))
          .on('requestfailed', request =>
              console.log(`${request.failure().errorText} ${request.url()}`));
  }

  try {
    await page.goto(
      `file:${path.join(__dirname, 'src', 'index.html')}`,
      {waitUntil: 'networkidle2'}
    );

    // Enter document context and add message data
    await page.evaluate((messageData) => {
      addMessages(messageData);
    }, messageData);

    const body = await page.$('body');
    if (DEBUG_SCREENSHOT) {
        await body.screenshot({
            path: 'tmp.png'
        });
    } else {
        // Write base64 image representation of body to stdout
        let screenshot = await body.screenshot({
            encoding: 'base64',
            type: 'png',
            // quality: 100,  // only applies to jpegs
            omitBackground: false,
        });
        console.log(screenshot);
    }
  } catch (e) {
    console.error(e);
  }

  await browser.close();
}

let messageData = process.argv[2];
if (messageData) {
  messageData = JSON.parse(messageData);
  generateScreenshot(messageData);
}
