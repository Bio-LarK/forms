'use strict';

describe('Service: annotatorService', function () {

  // load the service's module
  beforeEach(module('formsApp'));

  // instantiate service
  var annotatorService;
  beforeEach(inject(function (_annotatorService_) {
    annotatorService = _annotatorService_;
  }));

  it('should do something', function () {
    expect(!!annotatorService).toBe(true);
  });

});
