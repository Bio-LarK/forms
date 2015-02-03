

describe('Request Form', function() {

    describe("Pedigree Button", function () {

        var button;

        beforeEach(function() {
            browser.get('#/request');
            button = element(by.linkText('Open Pedigree Editor'));

        })

        it('should have a pedigree button', function() {
            expect(button.isPresent()).toBe(true);
        });

        it('should go to pedigree editor', function() {
            var appWindow = browser.getWindowHandle();
            button.click().then(function () {
                browser.getAllWindowHandles().then(function (handles) {
                    newWindowHandle = handles[1];
                    browser.switchTo().window(newWindowHandle).then(function () {
                        expect(browser.driver.getCurrentUrl()).toBe('http://panogram.github.io/panogram/');
                        browser.driver.close().then(function () {
                            browser.switchTo().window(appWindow);
                        });
                    });
                });
            });
        });

    });

});

