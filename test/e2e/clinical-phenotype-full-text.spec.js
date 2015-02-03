/**
 * So that I can important high level information about a patient
 * As a medical person
 * I want to the pedigree to have highlighted terms
 */

/**
 * Scenario:
 * Given I am on a form page
 * And I've filled in the Pedigree with 'This patient has short arms'
 * Then I should see 'short arms' highlighted
 */
describe('Request Form', function() {
    describe("Clinical Phenotype Full Text", function () {

        var phenotypeFullTextInput;

        beforeEach(function() {
            browser.get('#/request');
            phenotypeFullTextInput = element(by.model('phenotypeFullText'));
        });

        it('should have a phenotype full text input', function() {
            expect(phenotypeFullTextInput.isPresent()).toBe(true);
        });
        it('should have a phenotype full text label', function() {
            var phenotypeFullTextLabel = element(by.cssContainingText('label', 'Clinical Phenotype (2 or more clinical features required)'));
            expect(phenotypeFullTextLabel.isPresent()).toBe(true);
        })

        it('should tag the input', function() {
            phenotypeFullTextInput.sendKeys('the patient has short arms');

            var shortArmTag = element(by.cssContainingText('.label-phenotype', 'short arms'));
            expect(shortArmTag.isPresent()).toBe(true);
        });

    });

});

