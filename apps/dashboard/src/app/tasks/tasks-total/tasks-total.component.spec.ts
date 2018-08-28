import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTotalComponent } from './tasks-total.component';

describe('TasksTotalComponent', () => {
  let component: TasksTotalComponent;
  let fixture: ComponentFixture<TasksTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
