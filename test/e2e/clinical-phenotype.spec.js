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

        var phenotypeInput;

        beforeEach(function() {
            browser.get('#/request');
            var select = element(by.model('phenotype.selectedTerms'));
            phenotypeInput = select.element(by.css('input'));
        });

        it('should have a clinical phenotype input', function() {
            expect(phenotypeInput.isPresent()).toBe(true);
        });
        it('should have a clinical phenotype label', function() {
            var phenotypeLabel = element(by.cssContainingText('label', 'Clinical Phenotype (2 or more clinical features required)'));
            expect(phenotypeLabel.isPresent()).toBe(true);
        });

        it('should autocomplete terms', function() {
            phenotypeInput.sendKeys('dwarfis');
            var dwarfismOption = element(by.cssContainingText('.ui-select-choices-row', 'Dwarfism'));
            expect(dwarfismOption.isPresent()).toBe(true);
        });

        it('should add multiple terms', function() {
            phenotypeInput.sendKeys('dwarfis');
            var dwarfismOption = element(by.cssContainingText('.ui-select-choices-row', 'Dwarfism'));
            dwarfismOption.click();

            var dwarfismAdded = element(by.cssContainingText('.ui-select-match-item', 'Dwarfism'));
            expect(dwarfismAdded.isPresent()).toBe(true);

            phenotypeInput.sendKeys('dwarfism reco');
            var dwarfismAtBirthOption = element(by.cssContainingText('.ui-select-choices-row', 'Dwarfism recognizable at birth'));
            dwarfismAtBirthOption.click();

            var dwarfismAtBirthAdded = element(by.cssContainingText('.ui-select-match-item', 'Dwarfism recognizable at birth'));
            expect(dwarfismAtBirthAdded.isPresent()).toBe(true);
        });
    });

});

