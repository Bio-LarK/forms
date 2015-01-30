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
        browser.get('#/dashboard');
        expect(browser.getTitle()).toBe('Dashboard');
    });

    it('should have a button in the navbar', function() {
        browser.get('#/dashboard');
        var dashboardButton = element(by.cssContainingText('.navbar-nav a', 'Dashboard'));
        expect(dashboardButton.isPresent()).toBe(true);

        dashboardButton.click();
        expect(browser.getTitle()).toBe('Dashboard');
    });

    it('should show sample submission', function() {
        browser.get('#/dashboard');
        var sampleSubmission = element(by.cssContainingText('h3', 'Sample Submission'));
        expect(sampleSubmission.isPresent()).toBe(true);
    });

});

