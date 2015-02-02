'use strict';

describe('Service: pedigreeMarkupService', function () {

  // load the service's module
  beforeEach(module('formsApp'));

  // instantiate service
  var pedigreeMarkupService;
  beforeEach(inject(function (_pedigreeMarkupService_) {
    pedigreeMarkupService = _pedigreeMarkupService_;
  }));

  it('should do something', function () {
    expect(!!pedigreeMarkupService).toBe(true);
  });

});
