import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpoliceComponent } from './npolice.component';

describe('NpoliceComponent', () => {
  let component: NpoliceComponent;
  let fixture: ComponentFixture<NpoliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpoliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
