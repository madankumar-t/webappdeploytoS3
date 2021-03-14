import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { RecentEvent } from '../models/home.model';
import { APIRequestUrls } from 'app/shared/api';
import { Pagination, SmMenuItem } from '@app/shared/models/shared.models';

@Injectable({ providedIn: 'root' })
export class HomePageService {
  lastActivityDate: any;

  constructor(private http: HttpClient) {}

  getRecentEvents() {
    return new Observable((observer) => {
      return this.http
        .get(APIRequestUrls.recentEvents)
        .subscribe((events: any) => {
          let recentEvents: RecentEvent[] = [];
          if (events.length > 0) {
            events.forEach((element: any) => {
              element.eventDate = this.getFormatedDate(element.date);
              let events = {
                title: element.title.rendered,
                description: element.excerpt.rendered,
                date: element.eventDate,
                contentRender: element.content.rendered,
              };
              recentEvents.push(events);
            });
          }
          observer.next(recentEvents);
        });
    });
  }

  getWorkspaces(userid: number, from: number, size: number, query?: string) {
    return new Observable((observer) => {
      return this.http
        .get(
          APIRequestUrls.workspace +
            userid +
            '?from=' +
            from +
            '&&size=' +
            size +
            '&&q=' +
            query
        )
        .subscribe((workspaces: any) => {
          observer.next(workspaces);
        });
    });
  }

  getWorkspaceItem(type: string, pagination: Pagination, parms: any) {
    return new Observable((observer) => {
      return this.http
        .get(
          APIRequestUrls.workspaceObjects +
            parms.userId +
            '/' +
            parms.workspaceId +
            '/' +
            parms.activeTab +
            '?from=' +
            pagination.from +
            '&&size=' +
            pagination.size +
            '&&sort_by=' +
            parms.sortBy.code +
            '&&active_tab=' +
            parms.activeTab +
            '&&q=' +
            parms.query
        )
        .subscribe((workspaces: any) => {
          observer.next(workspaces);
        });
    });
  }

  getRecentActivities(workspaceId: number, userId: number) {
    return new Observable((observer) => {
      return this.http
        .get(APIRequestUrls.recentActivities + '/' + userId + '/' + workspaceId)
        .subscribe((activities: any = {}) => {
          let recentActivities: any[] = [];
          if (activities.length > 0) {
            activities.forEach((element: any) => {
              let activityDate = this.getFormatedDate(element.activity_date);
              // To show the time for each activity or not
              let showActivityTitle = true;
              if (this.lastActivityDate == activityDate) {
                showActivityTitle = false;
              } else {
                showActivityTitle = true;
              }

              this.lastActivityDate = activityDate;
              let recentActivity = {
                description: element.description,
                activityDate: activityDate,
                activityBy: element.activity_by,
                activityTo: element.activity_to,
                activityType: element.activity_type,
              };

              let recentActivitiesConcat = {};
              let activityDescriptionObject = this.getActivityDescription(
                element
              );
              recentActivitiesConcat = Object.assign(
                {},
                recentActivity,
                activityDescriptionObject
              );

              recentActivities.push(recentActivitiesConcat);
            });
          }
          observer.next(recentActivities);
        });
    });
  }

  getActivityDescription(element: any) {
    var activityTypes = [
      1,
      5,
      7,
      8,
      9,
      6,
      13,
      14,
      15,
      20,
      21,
      22,
      23,
      24,
      12,
      25,
      18,
      19,
    ];
    let splitDescription = [];
    let descriptionString1;
    let descriptionString2;
    let isObjectLink: boolean = false;
    let objectName;
    let objectNameStartIndex;
    let objectNameEndindex;
    if (activityTypes.indexOf(element.activity_type) > -1) {
      splitDescription = element.description.split(' ');
      objectNameStartIndex = splitDescription.indexOf('named') + 1;
      switch (element.activity_type) {
        case 5:
          objectNameEndindex = splitDescription.length;
          break;
        case 6:
          objectNameStartIndex = splitDescription.indexOf('from') + 1;
          objectNameEndindex = splitDescription.length;
          break;
        case 7:
          objectNameEndindex = splitDescription.length;
          break;
        case 8:
          objectNameStartIndex = splitDescription.indexOf('from') + 1;
          objectNameEndindex = splitDescription.length;
          break;
        case 9:
          objectNameEndindex = splitDescription.indexOf('from');
          break;
        case 13:
          objectNameEndindex = splitDescription.indexOf('to');
          break;
        case 21:
          objectNameEndindex = splitDescription.indexOf('to');
          break;
        case 22:
          objectNameEndindex = splitDescription.indexOf('to');
          break;
        case 14:
          objectNameStartIndex = splitDescription.indexOf('as') + 1;
          objectNameEndindex = splitDescription.length;
          break;
        case 10:
          objectNameEndindex = splitDescription.length;
          break;
        case 15:
          objectNameEndindex = splitDescription.length;
          break;
        case 20:
          objectNameEndindex = splitDescription.length;
          break;
        case 23:
          objectNameStartIndex = splitDescription.lastIndexOf('for') + 1;
          objectNameEndindex = splitDescription.length;
          break;
        case 24:
          objectNameStartIndex = splitDescription.lastIndexOf('for') + 1;
          objectNameEndindex = splitDescription.length;
          break;
        case 12:
          objectNameEndindex = splitDescription.length;
          break;
        case 1:
          objectNameEndindex = splitDescription.length;
          break;
        case 25:
          objectNameStartIndex = splitDescription.lastIndexOf('to') + 1;
          objectNameEndindex = splitDescription.length;
          break;
        case 18:
          objectNameEndindex = splitDescription.length;
          break;
        case 19:
          objectNameStartIndex = splitDescription.indexOf('of') + 1;
          objectNameEndindex = splitDescription.indexOf('from');
          break;
      }

      if (element.activity_type == 21 && element.activity_by != 1231) {
        isObjectLink = false;
        let recentActivities = {
          isObjectLink: isObjectLink,
        };
        return recentActivities;
      } else {
        //splitting the description to make the object name as clickable.
        descriptionString1 = splitDescription.slice(0, objectNameStartIndex);
        descriptionString2 = splitDescription.slice(
          objectNameEndindex,
          splitDescription.length
        );
        objectName = splitDescription.slice(
          objectNameStartIndex,
          objectNameEndindex
        );
        descriptionString1 = descriptionString1.join(' ');
        descriptionString2 = descriptionString2.join(' ');
        objectName = objectName.join(' ');
        isObjectLink = true;
        let recentActivities = {
          descriptionString1: descriptionString1,
          descriptionString2: descriptionString2,
          objectName: objectName,
          isObjectLink: isObjectLink,
        };
        return recentActivities;
      }
    } else {
      isObjectLink = false;
      let recentActivities = {
        isObjectLink: isObjectLink,
      };
      return recentActivities;
    }
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
}
