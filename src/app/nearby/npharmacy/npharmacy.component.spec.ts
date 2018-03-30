import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpharmacyComponent } from './npharmacy.component';

describe('NpharmacyComponent', () => {
  let component: NpharmacyComponent;
  let fixture: ComponentFixture<NpharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
