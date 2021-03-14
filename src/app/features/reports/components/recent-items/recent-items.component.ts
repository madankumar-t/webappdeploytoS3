import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

import {
  ObjectCard,
  ObjectItemCard,
  Pagination,
  SmMenuItem,
} from '@app/shared/models/shared.models';
import { exposureMenu } from '../../../../core/models/menuconstant';
import { CoreConfigService } from '@app/core/services/config.service';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'recent-items',
  templateUrl: './recent-items.component.html',
  styleUrls: ['./recent-items.component.scss'],
})
export class RecentItemsComponent implements OnInit {
  @ViewChild('rp') rp!: ContextMenu;

  @Input() reportType: any = 'report';
  reportItemOptions: ObjectCard;
  reportPagination: Pagination;
  reports: ObjectItemCard[] = [];
  reportMenu: MenuItem[] = [];
  subscription: any;
  userId: number = 0;
  workspaceId: string = 'all';
  selectedSort: SmMenuItem = { name: 'Sort By', code: '-1' };
  showComingSoon: boolean = false;
  query: string = '';

  constructor(
    private reportService: ReportsService,
    private _coreService: CoreConfigService
  ) {
    this.reportItemOptions = {
      defaultImg: '../../../../../assets/images/exposure_img.png',
      imagename: 'snapshort_path',
      object_type: 'report',
    };
    this.reportPagination = { from: 0, size: 8, count: 0 };
    this.reportMenu = this.addPopup(exposureMenu);
  }

  ngOnInit(): void {
    this.getItem(this.reportType);
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
    let pagination: Pagination = this.reportPagination;
    let userId = this._coreService.getUserId();
    let params = {
      userId: this.userId,
      workspaceId: this.workspaceId,
      sortBy: this.selectedSort,
      activeTab: 'report',
      query: this.query,
      object_sub_type: events,
    };
    this.reportService
      .getReportItem(pagination, params)
      .subscribe((obj: any) => {
        this.reports = obj.report.data;
      });
  };

  showContextMenu(event: MouseEvent, type: string) {
    let cm: ContextMenu;
    switch (type) {
      case 'report':
        cm = this.rp;
        break;
      default:
        cm = this.rp;
    }
    cm.show(event);
    event.stopPropagation();
  }

  showPopup() {
    this.showComingSoon = true;
  }
}
