import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomosTotalComponent } from './pomos-total.component';

describe('PomosTotalComponent', () => {
  let component: PomosTotalComponent;
  let fixture: ComponentFixture<PomosTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PomosTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PomosTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
