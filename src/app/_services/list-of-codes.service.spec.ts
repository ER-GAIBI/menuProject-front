import { TestBed } from '@angular/core/testing';

import { ListOfCodesService } from './list-of-codes.service';

describe('ListOfCodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListOfCodesService = TestBed.get(ListOfCodesService);
    expect(service).toBeTruthy();
  });
});
