import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailMenuComponent } from './trail-menu.component';

describe('TrailMenuComponent', () => {
  let component: TrailMenuComponent;
  let fixture: ComponentFixture<TrailMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
