import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { InputErrorsComponent } from './authentication/errors/input-errors/input-errors.component';
import { ConfirmResetPasswordComponent } from './authentication/sign-in/confirm-reset-password/confirm-reset-password.component';
import { ResetPasswordComponent } from './authentication/sign-in/reset-password/reset-password.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { ConfirmSignUpComponent } from './authentication/sign-up/confirm-sign-up/confirm-sign-up.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HomePageComponent } from './post-authentication/home-page/home-page.component';
import {
  AuthenticationApiContactorService,
  AuthenticationApiContactorServiceFactory,
} from './service/authentication-api-contactor.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    ConfirmSignUpComponent,
    SignInComponent,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent,
    AuthenticationComponent,
    HomePageComponent,
    InputErrorsComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    { provide: AuthenticationApiContactorService, useFactory: AuthenticationApiContactorServiceFactory, deps: [HttpClient] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
