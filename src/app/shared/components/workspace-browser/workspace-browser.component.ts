import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

import { CoreConfigService } from '@app/core/services/config.service';
import {
  ObjectCard,
  ObjectItemCard,
  Pagination,
  SmMenuItem,
} from '@app/shared/models/shared.models';
import {
  exposureMenu,
  quickAddMenu,
  reportMenu,
  supportMenu,
} from '@app/core/models/menuconstant';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  TABNAMES,
  WORKSPACE_FILTER,
  WORKSPACE_SORT,
} from './workspace.constant';
import { WorkspaceBrowserService } from './workspace-browser.service';
import { NavbarService } from '@app/core/services/navbar.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 's-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
  providers: [WorkspaceBrowserService],
})
export class WorkspaceBrowserComponent implements OnInit {
  @ViewChild('ep') ep!: ContextMenu;
  @ViewChild('rp') rp!: ContextMenu;
  @ViewChild('quickaddbtn') quickaddbtn!: ContextMenu;

  @Input() ispopup: boolean = false;
  @Input() defaultTab: string = 'all';
  @Input() workspaceListHeight: string = 'calc(32vh - 4px)';
  @Input() minBufferPx: number = 40;
  @Input() maxBufferPx: number = 50;
  @Input() itemSize: number = 50 / 5;
  @Input() rows: number = 3;
  @Input() showSideBar: boolean = true;
  @Input() showSearch: boolean = false;
  @Input() checkBtn: boolean = false;

  query: string = '';
  exposureMenu: MenuItem[] = [];
  reportMenu: MenuItem[] = [];
  quickAdd: MenuItem[] = [];
  workspaceFilter: { [key: string]: any[] } = WORKSPACE_FILTER;
  workspaces: string[] = [];
  userId: number = 0;
  workspaceId: string = '';
  currentworkspaceId: string = '0';
  workspace_object_count = '0';
  workspace_from = 0;
  workspace_size = 10;
  activeTab: string = 'all';
  tabNames = TABNAMES;
  selectedSort: SmMenuItem;
  selectedFilter: SmMenuItem[];
  sortCategory: SmMenuItem[];
  filterCategory: SmMenuItem[];
  all: ObjectItemCard[] = [];
  exposures: ObjectItemCard[] = [];
  models: ObjectItemCard[] = [];
  reports: ObjectItemCard[] = [];
  analysis: ObjectItemCard[] = [];
  allPagination: Pagination;
  exposurePagination: Pagination;
  reportPagination: Pagination;
  modelPagination: Pagination;
  analysisPagination: Pagination;
  workspacePagination: Pagination;
  exposureItemOptions: ObjectCard;
  reportItemOptions: ObjectCard;
  subscription: any;
  showComingSoon: boolean = false;
  queryChanged = new Subject();
  enable: boolean = this.navbarService.showFlag;
  activeIndex: number = 0;
  initlizeCompleted = false;
  constructor(
    private workspaceBrowserService: WorkspaceBrowserService,
    private _coreService: CoreConfigService,
    private router: Router,
    private navbarService: NavbarService
  ) {
    this.exposureItemOptions = {
      defaultImg: 'assets/images/exposure_img.png',
      imagename: 'snapshort_path',
      object_type: 'exposure',
    };
    this.reportItemOptions = {
      defaultImg: 'assets/images/exposure_img.png',
      imagename: 'snapshort_path',
      object_type: 'report',
    };
    this.allPagination = this.exposurePagination = this.reportPagination = this.modelPagination = this.analysisPagination = this.workspacePagination = {
      from: 0,
      size: 20,
      count: 0,
    };
    this.sortCategory = WORKSPACE_SORT;
    this.selectedSort = WORKSPACE_SORT[0];
    this.selectedFilter = [];
    this.filterCategory = this.workspaceFilter[this.activeTab];
    this.exposureMenu = this.addPopup(exposureMenu);
    this.reportMenu = this.addPopup(reportMenu);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.ispopup == true && changes.defaultTab) {
      this.activeTab = changes.defaultTab.currentValue;
      this.filterCategory = this.workspaceFilter[this.activeTab];
    }
  }
  ngOnInit(): void {
    this.initlizeCompleted = false;
    this.userId = this._coreService.getUserId();
    this.getWorkspaces();
    this.getWorkspaceItem(this.activeTab);
    this._coreService.currentSearch.subscribe((searchText: any) => {
      if (
        this.ispopup === true &&
        this.query !== searchText &&
        this.initlizeCompleted === true
      ) {
        this.query = searchText;
        this.workspacePagination = {
          from: 0,
          size: 20,
          count: 0,
        };
        this.workspaces = [];
        this.getWorkspaces();
        this.intilize();
        this.getWorkspaceItem(this.activeTab);
      }
    });

    this.subscription = this._coreService.currentWorkspace.subscribe(
      (id: any) => {
        this.currentworkspaceId = id;
        this.workspaceId = id;
        if (this.initlizeCompleted === true) {
          this.intilize();
          this.getWorkspaceItem(this.activeTab);
        }
      }
    );
    this.subscription = this._coreService
      .getcontextMenuChangeEmitter()
      .subscribe((data: any) => this.showContextMenu(data.event, data.type));

    this.queryChanged.pipe(debounceTime(1000)).subscribe((searchText: any) => {
      if (this.initlizeCompleted === true) {
        this.query = searchText;
        this.workspacePagination = {
          from: 0,
          size: 20,
          count: 0,
        };
        this.getWorkspaces();
        this.workspaces = [];
        this.intilize();
        this.getWorkspaceItem(this.activeTab);
      }
    });
    this.initlizeCompleted = true;
  }

  addPopup(menu: any): MenuItem[] {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i]['label'] == 'Analytics') {
        if (menu[i].hasOwnProperty('command')) {
          menu[i]['command'] = () => {
            this.router.navigate([
              '/analytics/exposure-summary/select-analysis',
            ]);
          };
        }
      } else if (menu[i].hasOwnProperty('command')) {
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
  search(evt: any) {
    const searchText = evt.target.value;
    this.queryChanged.next(searchText);
  }

  intilize() {
    this.all = [];
    this.exposures = [];
    this.models = [];
    this.reports = [];
    this.analysis = [];
    this.allPagination = this.exposurePagination = this.reportPagination = this.modelPagination = this.analysisPagination = {
      from: 0,
      size: 20,
      count: 0,
    };
    for (const item in this.tabNames) {
      this.tabNames[item].init = false;
    }
  }

  getPagination(type: string): Pagination {
    let pagination: Pagination;
    switch (type) {
      case 'all':
        pagination = this.allPagination;
        pagination.from = this.all.length;
        break;
      case 'exposure':
        pagination = this.exposurePagination;
        pagination.from = this.exposures.length;
        break;
      case 'report':
        pagination = this.reportPagination;
        pagination.from = this.reports.length;
        break;
      case 'model':
        pagination = this.modelPagination;
        pagination.from = this.models.length;
        break;
      case 'analysis':
        pagination = this.analysisPagination;
        pagination.from = this.analysis.length;
        break;
      default:
        pagination = this.allPagination;
        pagination.from = this.all.length;
    }
    return pagination;
  }

  getWorkspaceItem = (type: any) => {
    let pagination: Pagination = this.getPagination(type);
    let parms = {
      userId: this.userId,
      workspaceId: this.workspaceId,
      sortBy: this.selectedSort,
      activeTab: this.activeTab,
      query: this.query,
    };

    this.workspaceBrowserService
      .getWorkspaceItem(type, pagination, parms)
      .subscribe((obj: any) => {
        this.tabNames.map((item) => {
          item.objectsCount = obj[item.name]?.count || '0';
          if (item.name == type) {
            item.init = true;
          }
          return item;
        });

        switch (this.activeTab) {
          case 'all':
            this.allPagination.count = obj[this.activeTab].count;
            this.all = [...this.all, ...obj[this.activeTab].data];
            break;
          case 'exposure':
            this.exposurePagination.count = obj[this.activeTab].count;
            this.exposures = [...this.exposures, ...obj[this.activeTab].data];
            break;
          case 'report':
            this.reportPagination.count = obj[this.activeTab].count;
            this.reports = [...this.reports, ...obj[this.activeTab].data];
            break;
          case 'model':
            this.modelPagination.count = obj[this.activeTab].count;
            this.models = [...this.models, ...obj[this.activeTab].data];
            break;
          case 'analysis':
            this.analysisPagination.count = obj[this.activeTab].count;
            this.analysis = [...this.analysis, ...obj[this.activeTab].data];
        }
      });
  };

  getWorkspaces() {
    this.workspaceBrowserService
      .getWorkspaces(
        this.userId,
        this.workspacePagination.from,
        this.workspacePagination.size,
        this.query
      )
      .subscribe((obj: any) => {
        this.workspacePagination.count = obj.count;
        this.workspace_object_count = obj.objectsCount || '0';
        this.workspaces = [...this.workspaces, ...obj.data];
      });
  }

  setWorkspace(id: string) {
    this.workspaceId = id;
    if (this.ispopup == false && id !== 'all') {
      this._coreService.changeWorkspace(id);
    } else {
      this.intilize();
      this.getWorkspaceItem(this.activeTab);
    }
  }

  changeTab(ev: any) {
    this.activeTab = this.tabNames[ev.index].name;
    this.filterCategory = this.workspaceFilter[this.activeTab];
    let currentTab = this.tabNames.find(
      (item: any) => item.name == this.activeTab
    );
    if (currentTab?.init != true) {
      this.getWorkspaceItem(this.activeTab);
    }
  }

  showContextMenu(event: MouseEvent, type: string) {
    let cm: ContextMenu;
    switch (type) {
      case 'exposure':
        cm = this.ep;
        break;
      case 'report':
        cm = this.rp;
        break;
      case 'quickadd':
        cm = this.quickaddbtn;
        break;
      default:
        cm = this.ep;
    }
    cm.show(event);
    event.stopPropagation();
  }

  loadWorkspaceObject(event: LazyLoadEvent, type: string) {
    let pagination: Pagination = this.getPagination(type); //this.exposurePagination;
    // pagination.from = this.exposures.length;
    if (pagination.from != 0) {
      if (type == 'all' && this.all.length < pagination.count) {
        this.allPagination.from = pagination.from;
        this.getWorkspaceItem(type);
      }
      if (type == 'exposure' && this.exposures.length < pagination.count) {
        this.exposurePagination.from = pagination.from;
        this.getWorkspaceItem(type);
      }
      if (type == 'report' && this.reports.length < pagination.count) {
        this.reportPagination.from = pagination.from;
        this.getWorkspaceItem(type);
      }
      if (type == 'model' && this.models.length < pagination.count) {
        this.modelPagination.from = pagination.from;
        this.getWorkspaceItem(type);
      }
      if (type == 'analsysis' && this.analysis.length < pagination.count) {
        this.analysisPagination.from = pagination.from;
        this.getWorkspaceItem(type);
      }
    }
  }

  loadWorkspace(event: LazyLoadEvent) {
    let pagination: Pagination = this.workspacePagination;
    pagination.from = this.workspaces.length;
    if (this.workspaces.length < pagination.count) {
      this.workspacePagination.from = pagination.from;
      this.getWorkspaces();
    }
  }

  showPopup() {
    this.showComingSoon = true;
  }

  //sort
  sortWorkspace(event: any) {
    this.selectedSort = event.value;
    this.intilize();
    this.getWorkspaceItem(this.activeTab);
  }

  //Filter

  filterWorkspaceItem(event: any) {
    this.selectedFilter = event.value;
    //this.getWorkspaceItem(this.activeTab);
  }
  clearFilter() {
    this.selectedFilter = [];
  }

  selectExposure(ev: any) {
    this.router.navigate(['/analytics/exposure-summary']);
  }
  /**
   * send event to shared OverlayPanel component
   */
  overlayPanel(event: any) {
    this.quickAdd = this.addPopup(quickAddMenu);
    this.navbarService.toggleMenu();
    this.enable = !this.enable;
    this.navbarService.sendOverlayEvent({
      event: event,
      menuList: quickAddMenu,
    });
  }
}
