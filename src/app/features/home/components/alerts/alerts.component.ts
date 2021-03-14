import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page.service';
import { TriggerdAlertImagesPath } from '@app/shared/api';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { CoreConfigService } from '@app/core/services/config.service';
@Component({
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  alerts: any[] = [];
  items: MenuItem[] = [];
  showComingSoon: boolean = false;
  alertSelected: any;
  selectedAlert: any;
  workspaceId: string = 'all';
  subscription: any;
  constructor(
    public homePageService: HomePageService,
    private primengConfig: PrimeNGConfig,
    private _coreService: CoreConfigService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    const userID = this._coreService.getUserId();
    let me = this;
    /**
     * To Close the workspace dropdown when user clicks anywhere on the document.
     */
    document.addEventListener('click', function (event) {
      if (event.target instanceof HTMLElement) {
        if (
          !event.target.closest('#triggeredMap') &&
          event.target.closest('.home-page-maps')
        ) {
          me.menuTag(me.alertSelected);
        }
      }
    });
    this.subscription = this._coreService.currentWorkspace.subscribe(
      (id: any) => {
        this.workspaceId = id;
        this.getAlertData(userID);
      }
    );
    this.items = [
      {
        label: 'Manage Alert',
        routerLink: ['/alert'],
        command: () => {
          this.showPopup();
        },
      },
      {
        label: 'View Triggered Alert',
        routerLink: ['/alert'],
        command: () => {
          this.showPopup();
        },
      },
    ];
    // this.getAlertData(userID);
  }

  showPopup() {
    this.showComingSoon = true;
  }
  getAlertData(userID: number) {
    this.homePageService
      .getTriggeredAlertsData(userID, this.workspaceId)
      .subscribe((alerts: any) => {
        this.alerts = alerts;
        if (this.alerts) {
          this.alerts.forEach((alert) => {
            let date = new Date(alert.alert_time);
            let differenceFromToday = this.homePageService.getDateDiffFromToday(
              date,
              true
            );
            if (differenceFromToday?.datePart == 'minutes') {
              alert[
                'differenceFromToday'
              ] = `${differenceFromToday.minuteDiff} min`;
            } else if (differenceFromToday?.datePart == 'hours') {
              alert[
                'differenceFromToday'
              ] = `${differenceFromToday.hoursDiff} hr ago`;
            } else if (differenceFromToday?.datePart == 'days') {
              alert[
                'differenceFromToday'
              ] = `${differenceFromToday.dateDiff} day ago`;
            } else if (differenceFromToday?.datePart == 'seconds') {
              alert[
                'differenceFromToday'
              ] = `${differenceFromToday.secondsDiff} sec ago`;
            }
          });
        }
      });
  }
  /******************* newly added code ****************/

  /**
   * set the selected alert object and scroll to that object
   * open alert context Menu
   * @param selectedAlert
   */
  menuTag(selectedAlert: any) {
    if (selectedAlert) {
      this.alerts.forEach((ele) => {
        if (ele.id == selectedAlert.id) {
          if (selectedAlert.alertSelected) {
            selectedAlert.alertSelected = false;
            this.homePageService.isDefaultAlerts = true;
            this.alertSelected = null;
            this.homePageService.setSelectedAlertAsset(selectedAlert);
          } else {
            this.alertSelected = selectedAlert;
            selectedAlert.alertSelected = true;
            this.homePageService.isDefaultAlerts = false;
            this.homePageService.selectedObjectId = selectedAlert.schedule_id;
            this.homePageService.scrollSelectedObject = true;
            // this.homePageService.setTabIndex(0, this.homePageService.selectedObjectId, this.requestedAccountId);
            this.selectedAlert = selectedAlert;
            // let isWrkSpcExt = this.workspaceList.filter((workspace) => this.selectedAlert.accountId == workspace.account_id);
            // if (isWrkSpcExt.length != 0) {
            // this.mawsService.setMenuItems({ menu: this.MenuItems, event: event });
            // }
            this.homePageService.setSelectedAlertAsset(selectedAlert);
          }
        } else {
          ele.alertSelected = false;
        }
      });
    }
  }
}
