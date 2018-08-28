/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { TasksService } from './tasks.service';

class HttpClientStub {}

describe('Service: Tasks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksService,
        {provide: HttpClient, useClass: HttpClientStub}
      ]
    });
  });

  it('should exist', inject([TasksService], (service: TasksService) => {
    expect(service).toBeTruthy();
  }));
});
