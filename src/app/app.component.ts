// angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// external libraries
import _isEmpty from 'lodash/isEmpty';

// services
import { NavbarService } from './core/services/navbar.service';
import { AuthenticationService } from './features/authentication/services/authentication.service';
import { CoreConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hidenav: boolean = true;
  modalBlur: boolean = false;
  subscription: any;
  constructor(
    private router: Router,
    public nav: NavbarService,
    private AuthService: AuthenticationService,
    private configService: CoreConfigService
  ) {
    this.hidenav = nav.visible;
  }

  ngOnInit() {
    const user = this.AuthService.getUser();
    if (_isEmpty(user)) {
      this.router.navigate(['/auth/login']);
    }
  }
}
