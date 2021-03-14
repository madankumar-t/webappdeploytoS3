import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavBarComponent } from './topnav-bar.component';

describe('TopnavBarComponent', () => {
  let component: TopnavBarComponent;
  let fixture: ComponentFixture<TopnavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopnavBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
