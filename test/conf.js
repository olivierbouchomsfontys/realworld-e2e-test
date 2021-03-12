exports.config = {
    framework: 'jasmine',
    headless: false,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['smoke.test.js'],
    multiCapabilities: [
        {browserName: 'firefox'},
        {browserName: 'chrome'}
    ],
    plugins: [
        {
        package: "protractor-react-selector"
        }
    ],
    onPrepare: async () => {
        await browser.waitForAngularEnabled(false);
    }
}

