/**
 * So I used well understood terms
 * As a medical person
 * I want to be able to select the phenotype from a taxonomy
 */

/**
 * Scenario:
 * Given I am on a form page
 * And I've filled in the clinical phenotype with 'dwarfism'
 * Then I should see 'dwarfism'
 */
describe('Request Form', function() {

    describe("Pedigree Input", function () {

        var diagnosisInput;

        beforeEach(function() {
            browser.get('#/request');
            var select = element(by.model('diagnosis.selected'));
            // there is a hidden input...for some reason, so we need to get the 2nd one
            diagnosisInput = select.all(by.css('input')).get(1);
        });

        it('should have a diagnosis input', function() {
            expect(diagnosisInput.isPresent()).toBe(true);
        });
        it('should have a clinical phenotype label', function() {
            var diagnosisLabel = element(by.cssContainingText('label', 'Diagnosis if known'));
            expect(diagnosisLabel.isPresent()).toBe(true);
        });

        it('should autocomplete terms', function() {
            var achondroplasiaOption = tryToFindAchondroplasia();
            expect(achondroplasiaOption.isPresent()).toBe(true);
        });

        it('should add a term', function() {
            var achondroplasiaOption = tryToFindAchondroplasia();
            achondroplasiaOption.click();

            var achondroplasiaAdded = element(by.cssContainingText('.ui-select-match', 'Achondroplasia'));
            expect(achondroplasiaAdded.isPresent()).toBe(true);
        });

        function tryToFindAchondroplasia() {
            diagnosisInput.sendKeys('achondroplas');
            var achondroplasiaOption = element(by.cssContainingText('.ui-select-choices-row', 'Achondroplasia'));
            return achondroplasiaOption;
        }

    });

});

