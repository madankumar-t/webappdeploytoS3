import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NavbarService } from '@app/core/services/navbar.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm?: NgForm;
  constructor(
    private route: Router,
    private userService: AuthenticationService,
    public nav: NavbarService
  ) {
    this.nav.hide();
  }

  ngOnInit(): void {}
}
