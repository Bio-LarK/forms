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
    describe("Pedigree Input", function () {

        var pedigreeInput;

        beforeEach(function() {
            browser.get('#/request');
            pedigreeInput = element(by.model('pedigree'));
        });

        it('should have a pedigree input', function() {
            expect(pedigreeInput.isPresent()).toBe(true);
        });
        it('should have a pedigree label', function() {
            var pedigreeLabel = element(by.cssContainingText('label', 'Pedigree with affecteds/unaffecteds/consanguinity/Gestational age if Pregnant'));
            expect(pedigreeLabel.isPresent()).toBe(true);
        })

        it('should tag the input', function() {
            pedigreeInput.sendKeys('the patient has short arms');

            var shortArmTag = element(by.cssContainingText('.label-phenotype', 'short arms'));
            expect(shortArmTag.isPresent()).toBe(true);
        });

    });

});

