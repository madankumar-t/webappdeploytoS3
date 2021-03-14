import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExposureComponent } from './select-exposure.component';

describe('SelectExposureComponent', () => {
  let component: SelectExposureComponent;
  let fixture: ComponentFixture<SelectExposureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectExposureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
