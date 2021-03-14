import { Injectable } from '@angular/core';
import { JS } from 'aws-amplify';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  getUser() {
    const key = `${environment.COGNITO_STORAGE_KEY}.${
      environment.COGNITO_USER_POOL_WEB_CLIENT_ID
    }.${localStorage.getItem('user_email')}.userData`;
    const userData = localStorage.getItem(key);
    return userData && JSON.parse(userData);
  }
}
