import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhospitalComponent } from './nhospital.component';

describe('NhospitalComponent', () => {
  let component: NhospitalComponent;
  let fixture: ComponentFixture<NhospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
