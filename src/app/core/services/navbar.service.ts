import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { menuData, supportData } from '../models/menuconstant';

@Injectable()
export class NavbarService {
  visible: boolean;
  showFlag: boolean;
  _showPopupSubscribe = new Subject<supportData>();
  _sendOverlayEvent = new Subject<menuData>();
  constructor() {
    this.visible = true;
    this.showFlag = false;
  }

  showMenu() {
    this.showFlag = true;
  }

  hideMenu() {
    this.showFlag = false;
  }

  toggleMenu() {
    this.showFlag = !this.showFlag;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  toggle() {
    this.visible = !this.visible;
  }

  showPopup(data: supportData) {
    this._showPopupSubscribe.next(data); //it is publishing this value to all the subscribers that have already subscribed to this message
  }

  sendOverlayEvent(event: menuData) {
    this._sendOverlayEvent.next(event);
  }
}
