import { TestBed } from '@angular/core/testing';

import { BoardAdminService } from './board-admin.service';

describe('BoardAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardAdminService = TestBed.get(BoardAdminService);
    expect(service).toBeTruthy();
  });
});
