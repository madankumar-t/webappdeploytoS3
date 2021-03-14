import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { analyticsConstants } from '../../../shared/constants.models';

@Component({
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss'],
})
export class AnalyticComponent implements OnInit {
  cardsContent = analyticsConstants;
  showComingSoon: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  action(e: any) {
    this.showPopup();
  }

  showPopup() {
    this.showComingSoon = true;
  }

  goTo() {
    this.router.navigate(['/analytics/exposure-summary/select-analysis']);
  }
}
