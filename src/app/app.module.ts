import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Amplify from 'aws-amplify';

import { environment } from '../environments/environment';

import { ApptRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NavbarService } from './core/services/navbar.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: environment.COGNITO_REGION,
    userPoolId: environment.COGNITO_USER_POOL_ID,
    userPoolWebClientId: environment.COGNITO_USER_POOL_WEB_CLIENT_ID,
    authenticationFlowType: environment.COGNITO_USER_AUTH_FLOW,
  },
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApptRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
  providers: [NavbarService],
})
export class AppModule {}
