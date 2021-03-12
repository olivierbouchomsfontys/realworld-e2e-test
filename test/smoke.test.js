const puppeteer = require('puppeteer');
const expect = require('chai').expect;

let browser = null;
let page = null;

const baseUrl = 'http://localhost:3000';

before(async () => {
    const launchOptions = {headless: false};

    if (process.env.LAUNCH_CHROME_NO_SANDBOX) {
        Object.assign(launchOptions, {args: ['--no-sandbox']});
    }

    browser = await puppeteer.launch(launchOptions);
    page = await browser.newPage();
});

after(async () => {
    await browser.close();
});

it('Show validation errors when logging in without any credentials', async () => {
    // Page load
    await page.goto(baseUrl);
    await page.waitForSelector('#userNameOrEmailAddress');

    await page.click('button[type="submit"]');
    await page.waitForSelector('div[role="alert"]');

    const validationMessages = await page.$$('div[role="alert"]');
    expect(validationMessages.length).to.equal(2);

    const validatorText = await page.evaluate((validationMessage) => {
        return validationMessage.innerText;
    }, validationMessages[0]);

    expect(validatorText).to.equal('This field is required');
});

it('Show popup when logging in with invalid credentials', async () => {
    //Page load
    await page.goto(baseUrl);
    await page.waitForSelector('#userNameOrEmailAddress');

    await page.type('#userNameOrEmailAddress', 'admin', {delay: 50});
    await page.type('#password', 'wrong', {delay: 50});
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-modal-content');
    await expect('.ant-modal-content').to.be.ok;
    await page.click('.ant-btn-primary');
    const dialog = await page.evaluate(async () => {
        return document.querySelector('.ant-modal-content')
    });

    expect(dialog == null).to.be.ok;
});

it('Redirect when logging in with correct credentials', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('#userNameOrEmailAddress');

    await page.type('#userNameOrEmailAddress', 'admin', {delay: 50});
    await page.type('#password', '123qwe', {delay: 50});

    await page.click('button[type="submit"]');

    // await page.waitForSelector();

    await page.waitForSelector('.ant-layout-content');

    expect(page.url()).to.equal('http://localhost:3000/dashboard')
})