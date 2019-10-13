const casual = require('casual');
const puppeteer = require('puppeteer');
const expect = require('chai').expect;

let browser = null;
let page = null;

const baseUrl = 'http://localhost:3000';

before(async () => {
    const launchOptions = process.env.CI ? {} : {headless: false, slowMo: 5};

    if (process.env.LAUNCH_CHROME_NO_SANDBOX) {
        console.warn('Launching Chrome with "--no-sandbox" option. ' +
            'This is not recommended due to security reasons!');
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

    await page.click('.ant-btn');
    await page.waitForSelector('.ant-form-explain');

    const validationMessages = await page.$$('.ant-form-explain');
    expect(validationMessages.length).to.equal(2);

    const validatorText = await page.evaluate((validationMessage) => {
        return validationMessage.innerText;
    }, validationMessages[0]);

    await page.waitFor(1000);

    expect(validatorText).to.equal('This field is required');
});

it('Show popup when logging in with invalid credentials', async () => {
    //Page load
    await page.goto(baseUrl);
    await page.waitForSelector('#userNameOrEmailAddress');

    await page.type('#userNameOrEmailAddress', 'admin', {delay: 100});
    await page.type('#password', 'wrong', {delay: 100});
    await page.click('.ant-btn-default');
    await page.waitForSelector('.ant-modal-content');
    await expect('.ant-modal-content').to.be.ok;
    await page.click('.ant-btn-primary');
    const dialog = await page.evaluate(async () => {
        return document.querySelector('.ant-modal-content')
    });

    expect(dialog == null).to.be.ok;
});
