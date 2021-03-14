import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@app/core/services/config.service';
import {
  ProfileService,
  UserProfile,
} from '@app/core/services/profile.service';
import { quickAddMenu } from '@app/core/models/menuconstant';
import { debounceTime } from 'rxjs/operators';
import {
  ObjectItemCard,
  Pagination,
  SmMenuItem,
} from '@app/shared/models/shared.models';
import {
  TABNAMES,
  WORKSPACE_SORT,
} from '@app/shared/components/workspace-browser/workspace.constant';
import { WorkspaceBrowserService } from '@app/shared/components/workspace-browser/workspace-browser.service';
import { NavbarService } from '@app/core/services/navbar.service';

interface notifyData {
  isNotification?: boolean;
}
@Component({
  selector: 'c-topnav-bar',
  templateUrl: './topnav-bar.component.html',
  styleUrls: ['./topnav-bar.component.scss'],
})
export class TopnavBarComponent implements OnInit {
  @ViewChild('quickaddbtn') quickaddbtn!: ContextMenu;
  overlayvisbile: boolean = false;
  workspaces: any;
  selectedWorkspace: string = '';
  subscription: any;
  workspaceId: string = '0';
  activeTab: string = 'all';
  userId: number = 0;
  query: string = '';
  userName: string = '';
  quickAdd: MenuItem[] = [];
  queryChanged = new Subject();
  showComingSoon: boolean = false;
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
  workspacePagination: any;
  tabNames = TABNAMES;
  selectedSort: SmMenuItem;
  wsBrowserOpen: boolean = false;
  search_text: string = '';
  oldSearch: string = '';
  enable: boolean = this.navbarService.showFlag;
  blur: boolean = true;
  defaultTab: string = 'all';
  selectedNotification: string = '';
  selectedUser: string = '';
  constructor(
    private configService: CoreConfigService,
    private profileService: ProfileService,
    public route: Router,
    private workspaceBrowserService: WorkspaceBrowserService,
    private navbarService: NavbarService
  ) {
    this.workspacePagination = {
      from: 0,
      size: 20,
      count: 0,
    };
    route.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        this.workspaceDefultTab();
      }
    });
    this.allPagination = this.workspacePagination = this.exposurePagination = this.reportPagination = this.modelPagination = this.analysisPagination = this.workspacePagination = {
      from: 0,
      size: 20,
      count: 0,
    };
    this.selectedSort = WORKSPACE_SORT[0];
  }

  workspaceDefultTab() {
    var path = this.route.url;
    switch (path) {
      case '/exposures':
        this.defaultTab = 'exposure';
        break;
      case '/reports':
        this.defaultTab = 'report';
        break;
      case '/analytics':
        this.defaultTab = 'analysis';
        break;
      case '/models':
        this.defaultTab = 'model';
        break;
      default:
        this.defaultTab = 'all';
    }
  }

  ngOnInit(): void {
    let me = this;
    this.userId = this.configService.getUserId();
    this.workspaceDefultTab();
    this.configService.activeBrowse.subscribe((isBrowse: boolean) => {
      this.wsBrowserOpen = isBrowse;
    });
    this.getWorkspaces();
    this.subscription = this.configService.currentWorkspace.subscribe(
      (id: any) => {
        this.selectedWorkspace = id;
      }
    );
    this.queryChanged.pipe(debounceTime(1000)).subscribe((searchText: any) => {
      if (this.oldSearch !== searchText) {
        this.query = searchText;
        this.configService.changeSearch(searchText);
      }
    });
    this.configService.currentSearch.subscribe((searchText: any) => {
      this.oldSearch = searchText;
      if (searchText === '') {
        this.search_text = '';
      }
    });
    document.addEventListener('click', function (event) {
      if (event.target instanceof HTMLElement) {
        if (
          !event.target.closest('#notification') &&
          !event.target.closest('#user') &&
          !event.target.closest('.sidebar')
        ) {
          me.removeStyle();
        }
      }
    });
  }

  getWorkspaces() {
    this.workspaceBrowserService
      .getWorkspaces(
        this.userId,
        this.workspacePagination.from,
        this.workspacePagination.size,
        this.query
      )
      .subscribe((obj: any) => {
        this.workspaces = [...obj.data];
      });
    let userDetail = this.profileService.getProfileObject();
    this.userName =
      userDetail.firstName?.substring(0, 1) +
      '' +
      userDetail.lastName?.substring(0, 1);
  }

  showSideBar(event: any) {
    if (event && event.target && event.target.id.includes('notification')) {
      let notifData: notifyData = {};
      notifData.isNotification = true;
      this.configService.emit<notifyData>(notifData);
      this.selectedUser = '';
      this.selectedNotification = 'notification';
    } else if (event && event.target && event.target.id.includes('user')) {
      let userDetail = this.profileService.getProfileObject();
      userDetail.isLogin = true;
      userDetail.isUserProfile = true;
      this.selectedNotification = '';
      this.selectedUser = 'users';
      this.configService.emit<UserProfile>(userDetail);
    }
  }

  changeWorkspace(event: any) {
    this.workspaceId = event.value.id;
    this.route.navigate(['/home/' + event.value.id]);
    this.configService.changeWorkspace(this.workspaceId);
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

  search(evt: any) {
    const searchText = evt.target.value;
    this.queryChanged.next(searchText);
  }

  onFocus() {
    this.wsBrowserOpen = true;
  }

  closeBrowser() {
    this.wsBrowserOpen = false;
    this.configService.changeSearch('');
  }

  showPopup() {
    this.showComingSoon = true;
  }

  showWorkspaceDialog() {
    this.wsBrowserOpen = true;
  }
  removeStyle() {
    this.selectedNotification = '';
    this.selectedUser = '';
  }
  /**
   * send event to shared OverlayPanel component
   */
  overlayPanel(event: any) {
    this.addPopup(quickAddMenu);
    this.navbarService.toggleMenu();
    this.enable = !this.enable;
    this.navbarService.sendOverlayEvent({
      event: event,
      menuList: quickAddMenu,
    });
  }
}
