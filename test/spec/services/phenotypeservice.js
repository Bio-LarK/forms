'use strict';

describe('Service: phenotypeService', function () {

  // load the service's module
  beforeEach(module('formsApp'));

  // instantiate service
  var phenotypeService;
  beforeEach(inject(function (_phenotypeService_) {
    phenotypeService = _phenotypeService_;
  }));

  it('should do something', function () {
    expect(!!phenotypeService).toBe(true);
  });

});
