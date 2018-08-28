import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoDetailComponent } from './pomo-detail.component';

describe('PomoDetailComponent', () => {
  let component: PomoDetailComponent;
  let fixture: ComponentFixture<PomoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PomoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PomoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
