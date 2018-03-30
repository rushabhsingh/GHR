import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceRequestsComponent } from './ambulance-requests.component';

describe('AmbulanceRequestsComponent', () => {
  let component: AmbulanceRequestsComponent;
  let fixture: ComponentFixture<AmbulanceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbulanceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulanceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
