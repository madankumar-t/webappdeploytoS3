import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceBrowserDialogComponent } from './workspace-browser-dialog.component';

describe('WorkspaceBrowserDialogComponent', () => {
  let component: WorkspaceBrowserDialogComponent;
  let fixture: ComponentFixture<WorkspaceBrowserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceBrowserDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceBrowserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
