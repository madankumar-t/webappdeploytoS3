import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Event, NavigationEnd } from '@angular/router';
import { APIRequestUrls } from '../api';
declare var window: any;
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}
  /**
   * common get request format, can be accessed from all the components
   * @param params
   */
  getRequest(params: any) {
    this.http.get(params.action).subscribe(
      (data) => {
        if (params.success) {
          params.success(data);
        }
      },
      (error) => {
        if (params.error) {
          params.error(error);
        }
      }
    );
  }

  /**
   * common post request format, can be accessed from all the components
   * @param request
   */
  postRequest(request: any) {
    this.http.post(request.action, request.params).subscribe(
      (data) => {
        if (request.success) {
          request.success(data);
        }
      },
      (error) => {
        if (request.error) {
          request.error(error);
        }
      }
    );
  }

  /**
   * common put request format, can be accessed from all the components
   * @param request
   */
  putRequest(request: any) {
    this.http.put(request.action, request.params).subscribe(
      (data) => {
        if (request.success) {
          request.success(data);
        }
      },
      (error) => {
        if (request.error) {
          request.error(error);
        }
      }
    );
  }
}
