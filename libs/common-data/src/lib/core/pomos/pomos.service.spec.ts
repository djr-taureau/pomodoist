import { TestBed, inject } from '@angular/core/testing';

import { PomosService } from './pomos.service';

describe('PomosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PomosService]
    });
  });

  it('should be created', inject([PomosService], (service: PomosService) => {
    expect(service).toBeTruthy();
  }));
});
