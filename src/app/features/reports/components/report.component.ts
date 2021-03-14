import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@app/core/services/config.service';

import { reportsConstants } from '../../../shared/constants.models';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  cardsContent = reportsConstants;
  showComingSoon: boolean = false;
  wsBrowserOpen: boolean = false;
  constructor(private _coreService: CoreConfigService) {}
  ngOnInit(): void {}
  action(e: any) {
    if (e == 'Browse') {
      this._coreService.openBrowseWS(true);
    } else {
      this.showPopup();
    }
  }
  showPopup() {
    this.showComingSoon = true;
  }
}
