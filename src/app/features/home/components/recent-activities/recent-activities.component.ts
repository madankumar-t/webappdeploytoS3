import { Component, OnInit } from '@angular/core';

import { HomePageService } from '../../services/home.service';
import { RecentActivities } from '../../models/home.model';
import { CoreConfigService } from '@app/core/services/config.service';

@Component({
  selector: 'recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss'],
})
export class RecentActivitiesComponent implements OnInit {
  recentActivities: RecentActivities[] = [];
  subscription: any;
  constructor(
    private homePageService: HomePageService,
    private _coreService: CoreConfigService
  ) {}

  ngOnInit(): void {
    this.getRecentActivities(-1);
    this.subscription = this._coreService.currentWorkspace.subscribe(
      (id: any) => this.getRecentActivities(id)
    );
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

  getRecentActivities(id: any) {
    let workspaceId = id;
    let userId = this._coreService.getUserId();
    this.homePageService
      .getRecentActivities(workspaceId, userId)
      .subscribe((obj: any) => (this.recentActivities = obj));
  }
}
