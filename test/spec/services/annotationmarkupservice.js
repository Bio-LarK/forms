'use strict';

describe('Service: annotationMarkupService', function () {

  // load the service's module
  beforeEach(module('formsApp'));

  // instantiate service
  var annotationMarkupService;
  beforeEach(inject(function (_annotationMarkupService_) {
    annotationMarkupService = _annotationMarkupService_;
  }));

  it('should do something', function () {
    expect(!!annotationMarkupService).toBe(true);
  });

});
