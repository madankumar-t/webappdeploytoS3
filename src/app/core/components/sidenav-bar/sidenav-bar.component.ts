import { Component, OnInit, ViewChild } from '@angular/core';
import { supportMenu } from '@app/core/models/menuconstant';
import { Subject } from 'rxjs';
import { NavbarService } from '@app/core/services/navbar.service';
import { CoreConfigService } from '@app/core/services/config.service';
import { MenuItem } from 'primeng/api';
import { StaticUrls } from '@app/shared/api';

@Component({
  selector: 'c-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss'],
})
export class SidenavBarComponent implements OnInit {
  @ViewChild('support', { static: false }) support: any;
  showPopup: boolean = false;
  coreConfig: any;
  baseUrl: string = window.origin;
  loggedInUser: any = {};
  hoverMenu: boolean = false;
  activeMenu: boolean = false;
  sideMenuItems: Array<any> = [];
  showComingSoon: boolean = false;
  private _unsubscribeAll: Subject<any>;
  displayBasic: boolean = false;
  enable: boolean = this.navbarService.showFlag;
  constructor(
    private navbarService: NavbarService,
    private _coreService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
    this.addPopup(supportMenu);
  }

  ngOnInit(): void {
    this.displaySideMenu();
    this._coreService.currentWorkspace.subscribe((id: any) => {
      this.sideMenuItems.map((item) => {
        if (item.name === 'home') {
          const workspaceid = id;
          item.path = '/home/' + workspaceid;
        }
        return item;
      });
    });
  }
  onMenuHover(menu: any | null) {
    menu.hoverMenu = true;
    // this.hoverMenu = true;
  }
  onMenuLeave(menu: any | null) {
    menu.hoverMenu = false;
    // this.hoverMenu = false;
  }
  navigateToModule(menu: any | null) {
    this.activeMenu = true;
  }
  showIcon() {
    // !menu.hoverMenu ? menu.nonActiveImageSrc: menu.hoverActiveImageSrc
    this.hoverMenu = this.activeMenu;
  }
  changeMenu(menu: any) {
    this.sideMenuItems.map((item: any) => {
      item.activeMenu = false;
      if (item.name == menu.name) {
        item.activeMenu = true;
      }
      return item;
    });
  }

  /**
   * prepare data for side menu i.e which modules to show and their related details
   */
  displaySideMenu() {
    this.sideMenuItems = [
      {
        name: 'home',
        key: 'homePage',
        path: '/home',
        nonActiveImageSrc: 'icon-home',
        hoverActiveImageSrc: 'icon-active-home',
        title: 'Home',
        activeMenu: true,
        hoverMenu: false,
      },
      {
        name: 'exposures',
        key: '',
        path: '/exposures',
        nonActiveImageSrc: 'icon-exposures',
        hoverActiveImageSrc: 'icon-active-exposures',
        title: 'Exposures',
        activeMenu: false,
        hoverMenu: false,
      },
      {
        name: 'analytics',
        key: '',
        path: '/analytics',
        nonActiveImageSrc: 'icon-analysis',
        hoverActiveImageSrc: 'icon-active-analysis',
        title: 'Analytics',
        activeMenu: false,
        hoverMenu: false,
      },
      {
        name: 'reports',
        key: '',
        path: '/reports',
        nonActiveImageSrc: 'icon-reports',
        hoverActiveImageSrc: 'icon-active-reports',
        title: 'Reports',
        activeMenu: false,
        hoverMenu: false,
      },
      {
        name: 'alerts',
        key: '',
        path: '/alerts',
        nonActiveImageSrc: 'icon-alerts',
        hoverActiveImageSrc: 'icon-active-alerts',
        title: 'Alerts',
        activeMenu: false,
        hoverMenu: false,
      },
      {
        name: 'models',
        key: '',
        path: '/models',
        nonActiveImageSrc: 'icon-models',
        hoverActiveImageSrc: 'icon-active-models',
        title: 'Models',
        activeMenu: false,
        hoverMenu: false,
      },
    ];
  }

  addPopup(menu: any): MenuItem[] {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].hasOwnProperty('command')) {
        menu[i]['command'] = () => {
          if (menu[i].label !== 'Help center') {
            this.navbarService.showPopup({
              visible: true,
              header: menu[i].label,
            });
          } else {
            window.open(StaticUrls.help, '_blank');
          }
        };
      }
      if (menu[i].hasOwnProperty('items')) {
        this.addPopup(menu[i].items);
      }
    }
    return menu;
  }

  /**
   * send event to shared OverlayPanel component
   */
  overlayPanel(event: any) {
    this.navbarService.toggleMenu();
    this.enable = !this.enable;
    this.navbarService.sendOverlayEvent({
      event: event,
      menuList: supportMenu,
    });
  }
}
