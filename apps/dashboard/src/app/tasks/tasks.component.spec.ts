/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TasksService, TasksServiceStub } from '@workspace/common-data';

// class TasksServiceStub {}

describe('Component: Tasks', () => {
  let comp: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent
      ],
      providers: [
        {provide: TasksService, useClass: TasksServiceStub}
      ]
    });

    fixture = TestBed
      .overrideComponent(TasksComponent, {set: {template: ''}})
      .createComponent(TasksComponent);

    comp = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });
});
