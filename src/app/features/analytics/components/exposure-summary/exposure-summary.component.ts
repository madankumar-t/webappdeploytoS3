import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exposure-summary',
  templateUrl: './exposure-summary.component.html',
  styleUrls: ['./exposure-summary.component.scss'],
})
export class ExposureSummaryComponent implements OnInit {
  visible: boolean = false;
  showExposure: boolean = false;
  constructor(private route: Router) {}

  ngOnInit(): void {
    if (this.route.url == '/analytics/exposure-summary/select-analysis') {
      this.visible = true;
    } else if (
      this.route.url == '/analytics/exposure-summary/select-exposure'
    ) {
      this.showExposure = true;
    }
  }

  selectExposure() {
    // this.showExposure = true;
    this.route.navigate(['/analytics/exposure-summary/select-exposure']);
  }
}
