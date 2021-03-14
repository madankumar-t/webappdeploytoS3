import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationRoutingModule } from './autentication-routing.module';
import { AuthenticationComponent } from './components/authentication.component';
import { SharedModule } from '@app/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [SharedModule, AuthenticationRoutingModule],
  declarations: [AuthenticationComponent, LoginComponent, RegisterComponent],
  exports: [],
  providers: [],
})
export class AuthenticationModule {}
