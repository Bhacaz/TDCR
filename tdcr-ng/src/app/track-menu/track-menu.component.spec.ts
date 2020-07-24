import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMenuComponent } from './track-menu.component';

describe('TrackMenuComponent', () => {
  let component: TrackMenuComponent;
  let fixture: ComponentFixture<TrackMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
