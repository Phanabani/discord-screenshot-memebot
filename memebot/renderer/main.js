const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  // Set up browser and page.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });

  // Navigate to this blog post and wait a bit.
  try {
    await page.goto(
      `file:${path.join(__dirname, 'src', 'index.html')}`,
      {waitUntil: 'networkidle2'}
    );
    await page.waitForSelector('#messages-container>div');

    // Select the #svg img element and save the screenshot.
    const body = await page.$('body');
    let screenshot = await body.screenshot({
      encoding: 'base64',
      type: 'png',
      // quality: 100,  // only applies to jpegs
      omitBackground: false,
    });
    console.log('image length:', screenshot.length)
  } catch (e) {
    console.error(e);
  }

  await browser.close();
})();
