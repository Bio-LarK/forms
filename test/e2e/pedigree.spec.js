

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

        iit('should go to pedigree editor', function() {
            button.click();
            expect(browser.driver.getCurrentUrl()).toBe('http://panogram.github.io/panogram/');
        });

    });

});

