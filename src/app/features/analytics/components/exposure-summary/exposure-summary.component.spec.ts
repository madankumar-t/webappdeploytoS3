import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureSummaryComponent } from './exposure-summary.component';

describe('ExposureSummaryComponent', () => {
  let component: ExposureSummaryComponent;
  let fixture: ComponentFixture<ExposureSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExposureSummaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposureSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
