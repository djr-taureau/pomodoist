import { inject, TestBed } from '@angular/core/testing';

import { PomosFacade } from './pomos.facade';

describe('PomosFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PomosFacade]
    });
  });

  it('should be created', inject([PomosFacade], (service: PomosFacade) => {
    expect(service).toBeTruthy();
  }));
});
