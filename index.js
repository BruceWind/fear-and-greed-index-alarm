const { crawl } = require('./crawler');

const targetUrl = 'https://production.dataviz.cnn.io/index/fearandgreed/graphdata';


setTimeout(async () => {

    console.log("start");
    const result = await crawl(targetUrl);
    console.log("result: ", result);
    process.exit(0);
}, 10);