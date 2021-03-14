import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreConfigService } from '@app/core/services/config.service';

import { exposureConstants } from '../../../shared/constants.models';

@Component({
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss'],
})
export class ExposureComponent implements OnInit {
  cardsContent = exposureConstants;
  showComingSoon: boolean = false;
  constructor(
    private _coreService: CoreConfigService,
    private router: Router
  ) {}
  wsBrowserOpen: boolean = false;
  ngOnInit(): void {}

  action(e: any) {
    if (e === 'browse') {
      this._coreService.openBrowseWS(true);
    } else if (e === 'addNew') {
      this.router.navigate(['exposures/add']);
    } else {
      this.router.navigate(['/import']);
    }
  }

  closeBrowser() {
    this.wsBrowserOpen = false;
    this._coreService.changeSearch('');
  }

  showPopup() {
    this.showComingSoon = true;
  }
}
