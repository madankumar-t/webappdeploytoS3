import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/features/authentication/services/authentication.service';
import { Observable } from 'rxjs';
import { APIRequestUrls } from 'app/shared/api';
import { HttpClient } from '@angular/common/http';
import { CoreConfigService } from './config.service';
import { CommonService } from '@app/shared/services/common.service';
export interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  isLogin?: boolean;
  isUserProfile?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  MFA_STRINGS = {
    0: 'Never',
    1: 'One Week',
    11: 'One Day',
    2: 'Two Weeks',
    3: 'Three Weeks',
    4: 'One Month',
    10: 'Always',
  };
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private _coreService: CoreConfigService,
    private commonService: CommonService
  ) {}
  getProfileObject() {
    let userObject: UserProfile = {};

    let user = this.authService.getUser();
    user.UserAttributes.map(function (data: any) {
      let object: any = {};
      if (data.Name.includes('first_name')) {
        object.firstName = data.Value;
      } else if (data.Name.includes('last_name')) {
        object.lastName = data.Value;
      } else if (data.Name == 'email') {
        object.email = data.Value;
      }
      userObject = { ...object, ...userObject };
    });
    return userObject;
  }

  updateProfileData(model: any = {}) {
    let requestObject: any = {};
    let userId = this._coreService.getUserId();

    requestObject['user_id'] = userId;
    requestObject['sms_flag'] = 1;
    requestObject['mobile_verified_flag'] = 0;
    requestObject['mobile_number'] = model['mobile_number'];
    requestObject['fname'] = model['fname'];
    requestObject['lname'] = model['lname'];
    return new Observable((observer) => {
      var req = {
        action: APIRequestUrls.profile,
        params: requestObject,
        success: (data: any) => {
          observer.next(data);
        },
        error: (error: any) => {
          observer.error(error);
        },
      };
      this.commonService.postRequest(req);
    });
  }
}
