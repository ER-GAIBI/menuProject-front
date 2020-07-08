import { TestBed } from '@angular/core/testing';

import { BoardUserService } from './board-user.service';

describe('BoardUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardUserService = TestBed.get(BoardUserService);
    expect(service).toBeTruthy();
  });
});
