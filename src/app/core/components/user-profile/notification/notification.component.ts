import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core/services/notification.service';
import { HomePageService } from '@app/features/home/services/home-page.service';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  // checked: boolean = false;
  object_count = '3';
  // hour: City[] = [];
  // month: any[] = [];
  // day: any[] = [];
  // timezone: any[] = [];
  // allHours: any[] = [];
  // toggle:any[] = [];
  // selectedValue='threeHour';
  alerts: any[] = [];
  activities: any[] = [];
  recentEvents: any[] = [];
  constructor(
    private notificationService: NotificationService,
    public homePageService: HomePageService,
    public homeService: HomePageService
  ) {}

  ngOnInit(): void {
    this.notificationService.getAlertNotification().subscribe((data: any) => {
      let description: any = {};
      description.alerts = data.getUserAlertForNotificationJson.alerts;
      description.alert_limit =
        data.getUserAlertForNotificationJson.alert_limit;
      description.totalUnreadActivity =
        data.getUserAlertForNotificationJson.totalUnreadActivity;
      description.totalUnreadAlert =
        data.getUserAlertForNotificationJson.totalUnreadAlert;
      description.user_id = data.getUserAlertForNotificationJson.user_id;
      this.alerts.push(description);
      this.alerts[0].alerts.forEach((alert: any) => {
        let date = new Date(alert.alertTriggeredTime);
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
    });

    this.notificationService.getActivity().subscribe((data: any) => {
      let activity = {};
      data.forEach((element: any) => {
        element.eventDate = this.notificationService.getFormatedDate(
          element.activity_date
        );
      });
      this.activities = data;
    });

    this.notificationService.getRecentEvents().subscribe((obj: any) => {
      this.recentEvents = obj;
    });
  }

  menuTag(selectedAlert: any) {
    if (selectedAlert) {
      this.alerts[0].alerts.forEach((ele: any) => {
        this.homePageService.setSelectedAlertAsset(selectedAlert);
      });
    }
  }
  getActivityImage(activityType: number): string {
    let activityImage = '';
    if (activityType == 15) {
      activityImage = 'icon-user';
    } else if (activityType == 20) {
      activityImage = 'icon-layout';
    } else if (activityType == 4) {
      activityImage = 'icon-activity-ws';
    } else {
      activityImage = 'icon-activity-analysis';
    }

    return activityImage;
  }
}
