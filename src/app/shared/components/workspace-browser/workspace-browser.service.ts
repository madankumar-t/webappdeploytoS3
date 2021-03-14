import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { APIRequestUrls } from 'app/shared/api';
import { Pagination, SmMenuItem } from '@app/shared/models/shared.models';

@Injectable({ providedIn: 'root' })
export class WorkspaceBrowserService {
  lastActivityDate: any;

  constructor(private http: HttpClient) {}
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
}
