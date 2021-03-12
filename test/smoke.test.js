const protractor = require('protractor');

const by = protractor.by;
const element = protractor.element;
const browser = protractor.browser;
const until = protractor.ExpectedConditions;

const assert = console.assert;

describe('ABP Demo App', function () {
    it('Test logging in with valid credentials', async () => {
        await browser.get('http://localhost:3000');
        await browser.waitForReact();

        const emailInput = element(by.id('userNameOrEmailAddress'));
        const passwordInput = element(by.id('password'));
        const button = element(by.cssContainingText('button[type="submit"]', 'Log in'));

        // Wait for page load
        browser.wait(until.presenceOf(emailInput), 5000, 'error')

        await emailInput.sendKeys('admin')
        await passwordInput.sendKeys('123qwe');
        await button.click();

        const content = element(by.css('.ant-layout-content'));

        // Wait for page load
        browser.wait(until.presenceOf(content), 5000, 'error')

        const title = await browser.getTitle();

        assert(title === 'Dashboard | AppName');
    });
})
