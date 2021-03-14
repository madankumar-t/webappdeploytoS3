import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { NavbarService } from '@app/core/services/navbar.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 's-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss'],
})
export class OverlayMenuComponent implements OnInit {
  @Input() arrow: string = 'left-top';
  @Input() styleClass: string = '';
  @Input() show: boolean = this.navbarService.showFlag;
  @Input() overlayEffect: boolean = false;
  @ViewChild('op') op!: OverlayPanel;
  showOverlay: boolean = false;
  subscription: any;
  event: any;
  items: MenuItem[] = [];
  submenu: any;

  constructor(private navbarService: NavbarService) {}

  ngOnChanges(): void {
    if (this.navbarService.showFlag) {
      this.op.toggle(this.event);
    } else {
      if (this.op) {
        this.op.hide();
      }
    }
  }

  ngOnInit(): void {
    this.subscription = this.navbarService._sendOverlayEvent.subscribe(
      (res) => {
        this.submenu = this.checkForSubmenu(res.menuList);
        this.event = res.event;
        this.items = res.menuList;
      }
    );
  }

  hideMenu() {
    this.navbarService.hideMenu();
  }

  checkForSubmenu(menu: any, Obj: any = {}) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].hasOwnProperty('items')) {
        let label = menu[i].label;
        Obj[label] = true;
        this.checkForSubmenu(menu[i].items, Obj);
      }
    }
    return Obj;
  }

  closeMenu(ev: any) {
    if (!this.submenu.hasOwnProperty(ev.target.outerText)) {
      this.op.hide();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
