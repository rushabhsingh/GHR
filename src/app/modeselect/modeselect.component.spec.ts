import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeselectComponent } from './modeselect.component';

describe('ModeselectComponent', () => {
  let component: ModeselectComponent;
  let fixture: ComponentFixture<ModeselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
