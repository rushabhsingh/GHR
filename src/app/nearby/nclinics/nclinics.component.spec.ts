import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NclinicsComponent } from './nclinics.component';

describe('NclinicsComponent', () => {
  let component: NclinicsComponent;
  let fixture: ComponentFixture<NclinicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NclinicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NclinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
