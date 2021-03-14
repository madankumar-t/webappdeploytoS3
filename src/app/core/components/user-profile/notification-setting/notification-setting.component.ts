import { Component, OnInit } from '@angular/core';
import { APIRequestUrls } from 'app/shared/api';
import { CommonService } from '@app/shared/services/common.service';
import { CoreConfigService } from '@app/core/services/config.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment-timezone';
import * as ct from 'countries-and-timezones';
import * as _ from 'lodash';

@Component({
  selector: 'app-notification-setting',
  templateUrl: './notification-setting.component.html',
  styleUrls: ['./notification-setting.component.scss'],
  providers: [MessageService],
})
export class NotificationSettingComponent implements OnInit {
  checked: boolean = false;
  display: boolean = true;
  hour: any[] = [];
  minute: any[] = [];
  day: any[] = [];
  timezone: any[] = [];
  frequency: any[] = [];
  toggle: any[] = [];
  isAlertDigestON: boolean = true;
  selectedValue = 'threeHour';
  timeZones: any = [];
  alertDigestSettings: any = {};

  // alertDigestSetting: any = {
  //   user_id: '1249',
  //   digestTimeInUTC: '2021-09-08T08:02:17-05:00',
  //   frequency: { id: 12, name: 12 },
  //   isAlertDigestON: true,
  //   isPaused: false,
  //   startTime: '2021-09-08T08:02:17-05:00',
  //   startTimeAPI: '2021-03-01T03:30:00.968Z',
  //   timeZone: { name: 'Asia/Calcutta', country: 'IN', utcOffset: 330 },
  // };
  constructor(
    private commonService: CommonService,
    private configService: CoreConfigService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    // this.hour = [
    // { name: '1', id: '1' },
    // { name: '2', id: '2' },
    // { name: '3', id: '3' },
    // { name: '4', id: '4' },
    // { name: '5', id: '5' },
    // { name: '6', id: '6' },
    // { name: '7', id: '7' },
    // { name: '8', id: '8' },
    // { name: '9', id: '9' },
    // { name: '10', id: '10' },
    // { name: '11', id: '11' },
    // { name: '12', id: '12' },
    // ];
    // this.month = [
    // { name: '01', id: '1' },
    // { name: '02', id: '2' },
    // { name: '03', id: '3' },
    // { name: '04', id: '4' },
    // { name: '05', id: '5' },
    // { name: '06', id: '6' },
    // { name: '07', id: '7' },
    // { name: '08', id: '8' },
    // { name: '09', id: '9' },
    // { name: '10', id: '10' },
    // { name: '11', id: '11' },
    // { name: '12', id: '12' },
    // ];
    this.day = [
      { name: 'AM', id: 'AM' },
      { name: 'PM', id: 'PM' },
    ];
    this.timezone = [
      { name: 'Kolkata, West Bengal (GMT+5:30)', code: 'k' },
      { name: 'Delhi, new Delhi (GMT+5:30)', code: 'd' },
    ];
    this.frequency = [
      { label: '3 hr', id: '3', name: '3', selected: false },
      { label: '6 hr', id: '6', name: '6', selected: false },
      { label: '12 hr', id: '12', name: '12', selected: false },
      { label: '24 hr', id: '24', name: '24', selected: false },
    ];
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getHour();
    this.getMinute();
    let timeZonesInfo: any = ct.getAllTimezones();
    timeZonesInfo &&
      Object.keys(timeZonesInfo).forEach((timeZone: any) => {
        timeZonesInfo[timeZone]['nameWithOffset'] =
          timeZonesInfo[timeZone]['name'] +
          ` (GMT ${timeZonesInfo[timeZone]['utcOffsetStr']})`;
        this.timeZones.push(timeZonesInfo[timeZone]);
      });
    this.getAlertDigestSettings();
  }

  toggleColor(item: any, i: any) {
    this.alertDigestSettings.frequency = { id: item.id, name: item.name };
    let idx = 0;
    while (idx < this.frequency.length) {
      this.toggle[idx] = false;
      idx++;
    }
    this.toggle[i] = !this.toggle[i];
  }

  alertDigestON(event: any) {
    let checked = event.target.checked;
    if (checked) {
      this.alertDigestSettings.isAlertDigestON = true;
    } else {
      this.alertDigestSettings.isAlertDigestON = false;
    }
  }
  getAlertDigestSettings() {
    let userId = this.configService.getUserId();
    let settingParams: any = {
      action: APIRequestUrls.getAlertDigestSettings + '/' + userId,
      success: (data: any) => {
        if (data) {
          this.frequency.forEach((element) => {
            if (data[0].digest_interval.hours == element.name) {
              element.selected = true;
            } else {
              element.selected = false;
            }
          });
          this.alertDigestSettings.isAlertDigestON = data[0].subscribe_flag;
          this.alertDigestSettings.startTimeAPI = data[0].local_start_time;
          this.setTime(
            data[0].local_time_zone,
            this.alertDigestSettings.startTimeAPI
          );
        }
      },
      error: (error: any) => {
        if (error.status != 403) {
          console.log('error');
        }
      },
    };
    this.commonService.getRequest(settingParams);
  }

  saveAlertDigestSettings() {
    let userId = this.configService.getUserId();
    this.setUTCTime();
    this.alertDigestSettings.user_id = userId;
    let localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.alertDigestSettings.startTimeAPI = this.getTimeZoneAndTime(
      localTimeZone,
      this.alertDigestSettings.hour.name +
        ':' +
        this.alertDigestSettings.min.name
    );
    let params: any = {
      action: APIRequestUrls.saveAlertDigestSettings,
      params: this.alertDigestSettings,
      success: (data: any) => {
        if (data && data.saveAlertDigestUserSetting) {
          alert('successfully updated');
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Successfully updated',
          });
        }
      },
      error: (error: any) => {
        if (error.status != 403) {
          console.log('error', error);
        }
      },
    };
    this.commonService.postRequest(params);
  }
  cancel() {
    this.configService.emit<boolean>(false);
  }

  setTimeZoneAndTime(timeZone: any, time: any) {
    let userTimeZone = _.find(this.timeZones, { name: timeZone });
    this.alertDigestSettings.timeZone = userTimeZone || this.timeZones[0];
    let hoursAndMins = time.split(':');
    let currentDate = new Date();
    currentDate.setHours(hoursAndMins[0]);
    currentDate.setMinutes(hoursAndMins[1]);
    currentDate.setSeconds(0);
    this.alertDigestSettings.startTime = currentDate;
  }
  getTimeZoneAndTime(timeZone: any, time: any) {
    let userTimeZone = _.find(this.timeZones, { name: timeZone });
    this.alertDigestSettings.timeZone = userTimeZone || this.timeZones[0];
    let hoursAndMins = time.split(':');
    let currentDate = new Date();
    currentDate.setHours(hoursAndMins[0]);
    currentDate.setMinutes(hoursAndMins[1]);
    currentDate.setSeconds(0);
    let timeZoneSpecificTime = moment.tz(
      currentDate,
      this.alertDigestSettings.timeZone.name
    );
    return timeZoneSpecificTime.utc().format();
  }

  setTime(timeZone: any, time: any) {
    let userTimeZone = _.find(this.timeZones, { name: timeZone });
    this.alertDigestSettings.timeZone = userTimeZone || this.timeZones[0];
    // let hoursAndMins = time.split(":");
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    this.alertDigestSettings.hour = { name: hour, id: hour };
    this.alertDigestSettings.min = { name: minute, id: minute };
    if (hour > 12) {
      this.alertDigestSettings.dayFormat = { name: 'PM', id: 'PM' };
    } else {
      this.alertDigestSettings.dayFormat = { name: 'AM', id: 'AM' };
    }
  }
  setUTCTime() {
    let timeZoneSpecificTime = moment.tz(
      this.alertDigestSettings.startTime,
      this.alertDigestSettings.timeZone.name
    );
    this.alertDigestSettings.digestTimeInUTC = timeZoneSpecificTime
      .utc()
      .format();
  }

  getHour() {
    for (let h = 1; h < 25; h++) {
      let hour: any = {};
      hour.id = h;
      hour.name = h;
      this.hour.push(hour);
    }
  }
  getMinute() {
    for (var m = 1; m < 60; m++) {
      let minute: any = {};
      minute.id = m;
      minute.name = m;
      this.minute.push(minute);
    }
  }
}
