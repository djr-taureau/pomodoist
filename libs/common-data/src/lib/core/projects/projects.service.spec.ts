/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { ProjectsService } from './projects.service';

class HttpClientStub {}

describe('Service: Tasks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsService,
        {provide: HttpClient, useClass: HttpClientStub}
      ]
    });
  });

  it('should exist', inject([ProjectsService], (service: ProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
