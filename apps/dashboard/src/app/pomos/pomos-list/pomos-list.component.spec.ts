import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomosListComponent } from './pomos-list.component';

describe('PomosListComponent', () => {
  let component: PomosListComponent;
  let fixture: ComponentFixture<PomosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PomosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PomosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
