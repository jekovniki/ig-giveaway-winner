const puppeteer = require('puppeteer');
(async () => {
    try {
        console.info('start');
        const browser = await puppeteer.launch();
        console.info('browser initiated');
        const page = await browser.newPage();
        console.info('page loading');
        await page.goto(`https://www.instagram.com/p/C8U0OO0K_Yn/?img_index=1`, { waitUntil: 'networkidle0' });
        console.info('Waiting for selector')
        await page.waitForSelector('h3');
        console.info('taking posts');
        const assetPrice = await page.evaluate(() => {
            const h3Elements = document.querySelectorAll('h3');
            const h3Texts = Array.from(h3Elements).map(h3 => h3.textContent);
            
            return {
                descriptions: h3Texts,
            };
        });

        console.info('Result : ', assetPrice);
    } catch (error) {
        console.error('Critical error : ', error);
    }
})();