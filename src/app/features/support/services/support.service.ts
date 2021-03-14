import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIRequestUrls } from '@app/shared/api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SupportService {
  constructor(private http: HttpClient) {}

  getSampleData() {
    return new Observable((observer) => {
      return this.http
        .get(APIRequestUrls.sampleData)
        .subscribe((events: any) => {
          let sampleData: any = [];
          if (events.length > 0) {
            sampleData = events;
          }
          observer.next(sampleData);
        });
    });
  }
}
