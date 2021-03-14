import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

import { CoreConfigService } from '@app/core/services/config.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class UserProfileComponent implements OnInit {
  display: boolean = false;
  isNotification: boolean = false;
  isUserProfile: boolean = false;
  toggle: boolean = false;
  constructor(
    private configService: CoreConfigService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.configService.on<any>().subscribe((data) => {
      if (data && data.isNotification) {
        this.display = data.isNotification;
        this.isNotification = data.isNotification;
        this.isUserProfile = false;
      } else if (data && data.isUserProfile) {
        this.display = data.isUserProfile;
        this.isUserProfile = data.isUserProfile;
        this.isNotification = false;
      } else {
        this.display = false;
      }
    });
  }

  // onTabClose(event:any){
  //   event.originalEvent.stopPropagation();
  //   event.originalEvent.target.style.color = '#495057'
  // }
  // onTabOpen(event:any){
  //   event.originalEvent.target.style.color = '#2aa8a9';
  // }

  // saveAlertDigestSettings(updateUserSettings: boolean = false) {
  //   this.setUTCTime();
  //   this.alertDigestSettings.startTimeAPI = this.alertDigestSettings.startTime.getHours() + ":" + this.alertDigestSettings.startTime.getMinutes();
  //   let params: any = {
  //     action: APIRequestUrls.saveAlertDigestSettings,
  //     params: this.alertDigestSettings,
  //     success: (data: any) => {
  //       if (updateUserSettings) {
  //         let request: any = {
  //           action: 'api/settings/SaveDefaultAlertDigest/save',
  //           params: { SaveDefaultAlertDigest: true },
  //           success: (data: any) => {
  //             console.log("Default alert digest settings are saved");
  //           },
  //           error: (error: any) => {
  //             console.log("Not able to save default digest settings: " + error);
  //           }
  //         };
  //         this.commonService.postRequest(request);
  //       } else {
  //         let message: string = this.messagesService.getDBMessage(4013);
  //         this.messagesService.showToast(message, ToastType.success);
  //         this.closeSettings.emit(false);
  //       }
  //     },
  //     error: (error: any) => {
  //       if (error.status != 403) {
  //         let message: string = this.messagesService.getDbMessageDesc(4014, error.message);
  //         this.messagesService.showToast(message, ToastType.error);
  //       }
  //     }
  //   };
  //   this.commonService.postRequest(params);
  // }
}
