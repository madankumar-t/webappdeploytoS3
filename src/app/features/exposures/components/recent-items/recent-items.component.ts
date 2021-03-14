import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

import { ExposureService } from '../../services/exposure.service';
import {
  ObjectCard,
  ObjectItemCard,
  Pagination,
  SmMenuItem,
} from '@app/shared/models/shared.models';
import { exposureMenu } from '../../../../core/models/menuconstant';
import { CoreConfigService } from '@app/core/services/config.service';
@Component({
  selector: 'recent-items',
  templateUrl: './recent-items.component.html',
  styleUrls: ['./recent-items.component.scss'],
})
export class RecentItemsComponent implements OnInit {
  @ViewChild('ep') ep!: ContextMenu;
  exposureItemOptions: ObjectCard;
  exposurePagination: Pagination;
  exposures: ObjectItemCard[] = [];
  exposureMenu: MenuItem[] = [];
  subscription: any;
  userId: number = 0;
  workspaceId: string = 'all';
  selectedSort: SmMenuItem = { name: 'Sort By', code: '-1' };
  showComingSoon: boolean = false;
  query: string = '';

  constructor(
    private exposureService: ExposureService,
    private _coreService: CoreConfigService
  ) {
    this.exposureItemOptions = {
      defaultImg: '../../../../../assets/images/exposure_img.png',
      imagename: 'snapshort_path',
      object_type: 'exposure',
    };
    this.exposurePagination = { from: 0, size: 10, count: 0 };
    this.exposureMenu = this.addPopup(exposureMenu);
  }

  ngOnInit(): void {
    this.getItem('exposure');
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
    let pagination: Pagination = this.exposurePagination;
    this.userId = this._coreService.getUserId();
    let params = {
      userId: this.userId,
      workspaceId: this.workspaceId,
      sortBy: this.selectedSort,
      activeTab: 'exposure',
      query: this.query,
    };
    this.exposureService
      .getExposureItem(pagination, params)
      .subscribe((obj: any) => {
        this.exposures = obj.exposure.data;
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
