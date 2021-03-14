import { Injectable } from '@angular/core';
import { CommonService } from '@app/shared/services/common.service';
import { CoreConfigService } from './config.service';
import { APIRequestUrls } from 'app/shared/api';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HomePageService } from '@app/features/home/services/home.service';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  userId?: number;
  constructor(
    private commonService: CommonService,
    private coreConfigService: CoreConfigService,
    private homeService: HomePageService
  ) {}
  getAlertNotification() {
    let userId = this.coreConfigService.getUserId();
    return new Observable((observer) => {
      var request = {
        action: APIRequestUrls.getAlertNotification + '/' + userId,
        success: (data: any) => {
          observer.next(data);
        },
        error: (error: any) => {
          observer.error(error);
        },
      };
      this.commonService.getRequest(request);
    });
  }

  getActivity() {
    let userId = this.coreConfigService.getUserId();
    return new Observable((observer) => {
      var request = {
        action: APIRequestUrls.getActivity + '/' + userId,
        success: (data: any) => {
          observer.next(data);
        },
        error: (error: any) => {
          observer.error(error);
        },
      };
      this.commonService.getRequest(request);
    });
  }

  getFormatedDate(date: any) {
    let datePipe = new DatePipe('en-US');
    let todaysDate = datePipe.transform(new Date(), 'MMM-dd-yyyy');
    let dateForFilter = datePipe.transform(date, 'MMM-dd-yyyy');
    let newDate = new Date(date);
    let hour: string | Number = newDate.getHours();
    let minute: string | Number = newDate.getMinutes();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    let time = hour + ':' + minute;
    let actualDate = '';
    if (dateForFilter == todaysDate) {
      actualDate = time + ' Today';
    } else {
      let concatActivityDate = dateForFilter
        ?.replace('-', ' ')
        .replace('-', ', ');
      actualDate = time + ' ' + concatActivityDate;
    }
    return actualDate;
  }

  getRecentEvents() {
    return this.homeService.getRecentEvents();
  }
}
