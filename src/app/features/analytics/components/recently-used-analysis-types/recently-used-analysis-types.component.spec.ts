import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyUsedAnalysisTypesComponent } from './recently-used-analysis-types.component';

describe('RecentlyUsedAnalysisTypesComponent', () => {
  let component: RecentlyUsedAnalysisTypesComponent;
  let fixture: ComponentFixture<RecentlyUsedAnalysisTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentlyUsedAnalysisTypesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyUsedAnalysisTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
