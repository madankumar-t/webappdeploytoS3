import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { supportData } from '@app/core/models/menuconstant';
import { NavbarService } from '@app/core/services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit, OnDestroy {
  showPopup: supportData = { visible: false, header: '' };
  subscription: Subscription | undefined;
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.subscription = this.navbarService._showPopupSubscribe.subscribe(
      (res) => {
        this.showPopup = res;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
