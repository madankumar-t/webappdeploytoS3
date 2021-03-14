import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'recently-used-analysis-types',
  templateUrl: './recently-used-analysis-types.component.html',
  styleUrls: ['./recently-used-analysis-types.component.scss'],
})
export class RecentlyUsedAnalysisTypesComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  goTo() {
    this.route.navigate(['/analytics/exposure-summary/select-analysis']);
  }
}
