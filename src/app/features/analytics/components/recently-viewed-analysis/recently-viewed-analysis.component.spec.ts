import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyViewedAnalysisComponent } from './recently-viewed-analysis.component';

describe('RecentlyViewedAnalysisComponent', () => {
  let component: RecentlyViewedAnalysisComponent;
  let fixture: ComponentFixture<RecentlyViewedAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentlyViewedAnalysisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyViewedAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
