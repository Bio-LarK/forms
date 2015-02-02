'use strict';

describe('Service: disorderService', function () {

  // load the service's module
  beforeEach(module('formsApp'));

  // instantiate service
  var disorderService;
  beforeEach(inject(function (_disorderService_) {
    disorderService = _disorderService_;
  }));

  it('should do something', function () {
    expect(!!disorderService).toBe(true);
  });

});
