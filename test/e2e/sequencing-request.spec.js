/**
 Feature: Abstracts
 I want to be able to read a description of the disorder
 As a medical professional
 So that I can understand more about the disorder

 Scenario:
 Given I am on a disorder page
 Then I should be able to read the abstract
 */

describe("Dashboard", function () {

    it('should have an dashboard', function() {
        browser.get('#/request');
        expect(browser.getTitle()).toBe('Complete Genome Sequencing Request');
    });

    it('should have a button in the navbar', function() {
        browser.get('#/dashboard');
        var requestButton = element(by.cssContainingText('.navbar-nav a', 'Request'));
        expect(requestButton.isPresent()).toBe(true);

        requestButton.click();
        expect(browser.getTitle()).toBe('Complete Genome Sequencing Request');
    });

    it('should have an active navbar button when selected', function() {
        browser.get('#/request');
        var requestButton = element(by.cssContainingText('.navbar-nav li.active a', 'Request'));
        expect(requestButton.isPresent()).toBe(true);
    });

    it('should let you fill in a surname', function() {
        browser.get('#/request');
        var surnameLabel = element(by.cssContainingText('label', 'Surname'));
        expect(surnameLabel.isPresent()).toBe(true);
    });


});

