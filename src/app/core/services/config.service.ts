import { Injectable, EventEmitter } from '@angular/core';
import { AuthenticationService } from '@app/features/authentication/services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

interface UserDetails {
  UserAttributes: { [Name: string]: [Value: string] }[];
  Username: string;
}

@Injectable({ providedIn: 'root' })
export class CoreConfigService {
  workspaceId: string = '0';
  searchQuery: string = '';
  browserWSActive: boolean = false;
  workspacechange: EventEmitter<string> = new EventEmitter();
  contextmenuchange: EventEmitter<any> = new EventEmitter();
  _modelSubject: EventEmitter<boolean> = new EventEmitter();

  constructor(private _authService: AuthenticationService) {
    this.workspaceId = localStorage.getItem('workspaceId')?.toString() || '0';
  }

  public _subject = new BehaviorSubject<any>(false);
  private workspaceSource = new BehaviorSubject<string>(this.workspaceId);

  currentWorkspace = this.workspaceSource.asObservable();

  changeWorkspace(workspace: string) {
    localStorage.setItem('workspaceId', workspace);
    this.workspaceSource.next(workspace);
  }

  emit<T>(data: T) {
    this._subject.next(data);
  }

  on<T>(): Observable<T> {
    return this._subject.asObservable();
  }

  getUserId(): number {
    const user = this._authService.getUser();
    let userId: number = 0;
    user.UserAttributes.map((data: any) => {
      if (data.Name === 'custom:user_id') {
        userId = data.Value;
      }
      return data;
    });
    return userId;
  }

  emitcontextMenuChangeEvent(event: any, type: any) {
    let data = {
      event: event,
      type: type,
    };
    this.contextmenuchange.emit(data);
  }

  getcontextMenuChangeEmitter() {
    return this.contextmenuchange;
  }

  private searchSource = new BehaviorSubject<string>(this.searchQuery);

  currentSearch = this.searchSource.asObservable();

  changeSearch(search: string) {
    this.searchSource.next(search);
  }

  private activeBrowseSource = new BehaviorSubject<boolean>(
    this.browserWSActive
  );

  activeBrowse = this.activeBrowseSource.asObservable();

  openBrowseWS(isBrowse: boolean) {
    this.activeBrowseSource.next(isBrowse);
  }
}
