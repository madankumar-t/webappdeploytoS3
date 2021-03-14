import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

import { NavbarService } from '@app/core/services/navbar.service';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm?: NgForm;
  constructor(
    private route: Router,
    private userService: AuthenticationService,
    public nav: NavbarService
  ) {
    this.nav.hide();
  }
  isLoading: boolean = false;
  error: any;

  ngOnInit(): void {}

  async login() {
    const { email: username, password } = this.loginForm?.value;
    this.isLoading = true;
    this.error = {};
    try {
      const user = await Auth.signIn(username, password);
      if (user) {
        localStorage.setItem('user_email', username);
        this.route.navigate(['/']);
        this.nav.show();
      }
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  }
}
