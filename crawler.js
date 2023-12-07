const puppeteer = require('puppeteer');
const CLS_selsector = 'market-fng-gauge__dial-number-value';
const fs = require('fs');

const DATA_URI_V = "cms.cnn.com/_components/market-fng-gauge/instances/markets-fng-feature-ribbon@published";
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


// this function is so significant, it used to bypass the bot-detector.
async function createBrowserToAntiBotDetector() {

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
    // console.log("browser isConnected ", browser.isConnected());
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
    return { b: browser, page };
}

/**
 * 
 * @param {string} targetUrl, 
 * @returns {Promise<number>} -1 if fail, or suc.
 */
async function crawl(targetUrl) {


    if (!targetUrl) throw new Error("targetUrl is required");
    // console.log("targetUrl: ", targetUrl);
    let browser;
    try {
        console.log("start crawl");
        const { b, page } = await createBrowserToAntiBotDetector();
        browser = b;

        await page.goto(targetUrl);
        const selector = 'pre';
        await page.waitForSelector(selector);

        let data = await page.$eval(selector, (element) => element.textContent);
        let data_json = JSON.parse(data);
        const fngIndex = data_json?.fear_and_greed?.score;
        if (isNaN(fngIndex)) throw new Error("fngIndex is not a number");
        // console.log("fngIndex: ", fngIndex);
        return fngIndex;
    }
    catch (e) {
        console.log("error: ", e);
        return -1;
    } finally {
        if (browser) await browser.close();
    }
    return -1;
}

module.exports = {
    crawl
}