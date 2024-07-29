const puppeteer = require('puppeteer');

async function takeScreenshot() {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    console.log('Navigating to website...');
    await page.goto('https://pardarshee.zixub.com');

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'pardarsheee.png' });

    console.log('Screenshot taken, closing browser...');
    await browser.close();
    console.log('Browser closed, script finished.');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
}

takeScreenshot().catch(error => {
  console.error('Error in script:', error);
  process.exit(1);
});
