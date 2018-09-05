import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPomosListComponent } from './tasks-pomos-list.component';

describe('PomosListComponent', () => {
  let component: TasksPomosListComponent;
  let fixture: ComponentFixture<TasksPomosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksPomosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPomosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
