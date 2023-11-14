const puppeteer = require('puppeteer');
const CLS_selsector = 'market-fng-gauge__dial-number-value';
const fs = require('fs');

const DATA_URI_V = "cms.cnn.com/_components/market-fng-gauge/instances/markets-fng-feature-ribbon@published";
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 
 * @param {string} targetUrl, 
 * @returns {Promise<number>} 1 if success, 0 if fail.
 */
async function crawl(targetUrl) {


    if (!targetUrl) throw new Error("targetUrl is required");
    console.log("targetUrl: ", targetUrl);
    let browser;
    try {
        console.log("start crawl");

        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
        ];

        const options = {
            args,
            headless: true,
            ignoreHTTPSErrors: true,
            userDataDir: './tmp'
        };


        browser = await puppeteer.launch(options);
        console.log("browser isConnected ", browser.isConnected());
        const page = await browser.newPage();
        // Add Headers 
        await page.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'upgrade-insecure-requests': '1',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,en;q=0.8'
        });

        // Configure the navigation timeout
        await page.setDefaultNavigationTimeout(0);

        const preloadFile = fs.readFileSync('./preload.js', 'utf8');
        await page.evaluateOnNewDocument(preloadFile);

        await page.goto(targetUrl);            // go to site

        await page.waitForTimeout(6000);

        let elements = await page.evaluate(() => {
            let els = Array.from(document.body.querySelectorAll('#marketFeatureRibbon > div > div:nth-child(2) > div > div > div > div > div > div > div.market-fng-gauge__dial-number > span'));

            return els;
        });
        console.log('elements size: ' + elements.length);
        console.log("text: ", JSON.stringify(elements.map((el) => el.textContent)));

        for (let i = 0; i < elements.length; i++) {
            let spanElement = await elements[i];
            var data = await (await spanElement.getProperty('textContent')).jsonValue();
            console.log("spanElement data: ", data);
        }


        // console.log("elements: ", elements.length);
        // to find span from element, and 


        // // #hplogo - selector
        // await page.waitForSelector(SCREENSHOT_SELECTOR);             // wait for the selector to load
        // const logo = await page.$(SCREENSHOT_SELECTOR);              // declare a variable with an ElementHandle
        // const box = await logo.boundingBox();              // this method returns an array of geometric parameters of the element in pixels.
        // const x = box['x'];                                // coordinate x
        // const y = box['y'];                                // coordinate y
        // const w = box['width'];                            // area width
        // const h = box['height'];                           // area height
        // await page.screenshot({ 'path': 'logo.png', 'clip': { 'x': x, 'y': y, 'width': w, 'height': h } });     // take screenshot of the required area in puppeteer
        // await browser.close();                             // close browser
        console.log("screenshot done");
    }
    catch (e) {
        console.log("error: ", e);
        return 0;
    } finally {
        if (browser) await browser.close();
    }
    return 1;
}

module.exports = {
    crawl
}