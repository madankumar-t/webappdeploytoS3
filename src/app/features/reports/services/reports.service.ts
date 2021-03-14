import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIRequestUrls } from 'app/shared/api';
import { Pagination } from '@app/shared/models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getReportItem(pagination: Pagination, parms: any) {
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
            parms.query +
            '&&object_sub_type=' +
            parms.object_sub_type
        )
        .subscribe((workspaces: any) => {
          observer.next(workspaces);
        });
    });
  }
}
