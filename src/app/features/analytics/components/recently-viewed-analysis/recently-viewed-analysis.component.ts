import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ObjectCard,
  ObjectItemCard,
  Pagination,
  SmMenuItem,
} from '@app/shared/models/shared.models';
import { exposureMenu } from '../../../../core/models/menuconstant';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { CoreConfigService } from '@app/core/services/config.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'recently-viewed-analysis',
  templateUrl: './recently-viewed-analysis.component.html',
  styleUrls: ['./recently-viewed-analysis.component.scss'],
})
export class RecentlyViewedAnalysisComponent implements OnInit {
  @ViewChild('ep') ep!: ContextMenu;
  analysisItemOptions: ObjectCard;
  analytics: ObjectItemCard[] = [];
  analyticsPagination: Pagination;
  userId: number = 0;
  workspaceId: string = 'all';
  selectedSort: SmMenuItem = { name: 'Sort By', code: '1' };
  showComingSoon: boolean = false;
  exposureMenu: MenuItem[] = [];
  subscription: any;
  query: string = '';

  constructor(
    private analyticsService: AnalyticsService,
    private _coreService: CoreConfigService
  ) {
    this.analysisItemOptions = {
      defaultImg: '../../../../../assets/images/exposure_img.png',
      imagename: 'snapshort_path',
      object_type: 'exposure',
    };
    this.analyticsPagination = { from: 0, size: 8, count: 0 };
    this.exposureMenu = this.addPopup(exposureMenu);
  }

  ngOnInit(): void {
    this.getItem('analysis');
    this.subscription = this._coreService
      .getcontextMenuChangeEmitter()
      .subscribe((data: any) => this.showContextMenu(data.event, data.type));
  }

  addPopup(menu: any): MenuItem[] {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].hasOwnProperty('command')) {
        menu[i]['command'] = () => {
          this.showPopup();
        };
      }
      if (menu[i].hasOwnProperty('items')) {
        this.addPopup(menu[i].items);
      }
    }
    return menu;
  }

  getItem = (events: any) => {
    let pagination: Pagination = this.analyticsPagination;
    this.userId = this._coreService.getUserId();
    let params = {
      userId: this.userId,
      workspaceId: this.workspaceId,
      sortBy: this.selectedSort,
      activeTab: 'analysis',
      query: this.query,
    };
    this.analyticsService
      .getAnalyticsItem(pagination, params)
      .subscribe((obj: any) => {
        this.analytics = obj.analysis.data;
      });
  };

  showContextMenu(event: MouseEvent, type: string) {
    let cm: ContextMenu;
    switch (type) {
      case 'exposure':
        cm = this.ep;
        break;
      default:
        cm = this.ep;
    }
    cm.show(event);
    event.stopPropagation();
  }

  showPopup() {
    this.showComingSoon = true;
  }
}
