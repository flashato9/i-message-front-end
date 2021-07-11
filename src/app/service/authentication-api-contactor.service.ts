import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import TestAuthenticaitonApiContactorService from './test-authenticaiton-api-contactor.service';

@Injectable()
export class AuthenticationApiContactorService {
  readonly authenticationURL = environment.API_URL + '/authentication';

  constructor(public http: HttpClient) {}

  async signInUser(request: SignInRequest) {
    try {
      const result = await this.http //using the body here to get the http object
        .post<SignInResponse>(this.authenticationURL + '/sign-in', request, {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
          params: <any>request,
          observe: 'body',
          responseType: 'json',
        })
        .toPromise();
      return result;
    } catch (error: any) {
      const e: HttpErrorResponse = error;
      if (e.status === 400 || e.status === 500) return <SignInResponse>e.error;
      console.log(`${this.signInUser.name}() errored out.`, error);
      throw <HttpError>{ code: 'temp-code', message: 'Error occured when contacting the server.' };
    }
  }
  async getResetPasswordConfirmationCode(credentials: PasswordResetCodeCredentials) {
    try {
      const result = await this.http
        .get<PasswordResetCodeResponse>(
          this.authenticationURL + `/sign-in/${credentials.username}/reset-password/confirmation-code`,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            observe: 'body',
            responseType: 'json',
          }
        )
        .toPromise();
      return result;
    } catch (error: any) {
      const e: HttpErrorResponse = error;
      if (e.status === 400 || e.status === 500) return <PasswordResetCodeResponse>e.error;
      console.log(`${this.getResetPasswordConfirmationCode.name}() errored out.`, error);
      throw <HttpError>{ code: 'temp-code', message: 'Error occured when contacting the server.' };
    }
  }
  async submitNewPassword(credentials: PasswordResetConfirmCredentials, request: PasswordResetConfirmationRequest) {
    try {
      const result = await this.http
        .patch<PasswordResetConfirmationResponse>(
          this.authenticationURL + `/sign-in/${credentials.username}/reset-password`,
          request,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            observe: 'body',
            responseType: 'json',
          }
        )
        .toPromise();
      return result;
    } catch (error: any) {
      const e: HttpErrorResponse = error;
      if (e.status === 400 || e.status === 500) return <PasswordResetConfirmationResponse>e.error;
      console.log(`${this.submitNewPassword.name}() errored out.`, error);
      throw <HttpError>{ code: 'temp-code', message: 'Error occured when contacting the server.' };
    }
  }
  async signUpUser(request: SignUpRequest) {
    try {
      const result = await this.http
        .post<SignUpResponse>(this.authenticationURL + '/sign-up', request, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          observe: 'body',
          responseType: 'json',
        })
        .toPromise();
      return result;
    } catch (error: any) {
      const e: HttpErrorResponse = error;
      if (e.status === 400 || e.status === 500) return <SignUpResponse>e.error;
      console.log(`${this.signUpUser.name}() errored out.`, error);
      throw <HttpError>{ code: 'temp-code', message: 'Error occured when contacting the server.' };
    }
  }
  async getSignUpConfirmationCode(credentials: SignUpConfirmationCodeCredentials) {
    try {
      const result = await this.http
        .get<SignUpConfirmationGetCodeResponse>(this.authenticationURL + `/sign-up/${credentials.username}/confirm-code`, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          observe: 'body',
          responseType: 'json',
        })
        .toPromise();
      return result;
    } catch (error: any) {
      const e: HttpErrorResponse = error;
      if (e.status === 400 || e.status === 500) return <SignUpConfirmationGetCodeResponse>e.error;
      console.log(`${this.getSignUpConfirmationCode.name}() errored out.`, error);
      throw <HttpError>{ code: 'temp-code', message: 'Error occured when contacting the server.' };
    }
  }
  async SubmitSignUpConfirmationCode(credentials: SignUpConfirmationCodeCredentials, request: SignUpConfirmationCodeRequest) {
    try {
      const result = await this.http
        .patch<SignUpConfirmationSubmitCodeResponse>(
          this.authenticationURL + `/sign-up/${credentials.username}/confirm-code`,
          request,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            observe: 'body',
            responseType: 'json',
          }
        )
        .toPromise();
      return result;
    } catch (error: any) {
      const e: HttpErrorResponse = error;
      if (e.status === 400 || e.status === 500) return <SignUpConfirmationSubmitCodeResponse>e.error;
      console.log(`${this.SubmitSignUpConfirmationCode.name}() errored out.`, error);
      throw <HttpError>{ code: 'temp-code', message: 'Error occured when contacting the server.' };
    }
  }
}
export const AuthenticationApiContactorServiceFactory = (http: HttpClient) => {
  if (environment.production) return new AuthenticationApiContactorService(http);
  return new TestAuthenticaitonApiContactorService(http);
};
////INTERFACES
//HTTP
export interface HttpError {
  code: string;
  message: string;
}

export interface HttpStatusResponse {
  success: boolean;
  status_code: number;
  message: string;
}
//Sign-In
export interface SignInRequest {
  username: string;
  password: string;
}
export interface SignInResponse {
  submitted: SignInRequest;
  response_status: HttpStatusResponse;
  payload: string;
}
//Password Reset
export interface PasswordResetCodeCredentials {
  username: string;
}
export type PasswordResetCodeRequest = PasswordResetCodeCredentials;
export interface PasswordResetCodeResponse {
  submitted: PasswordResetCodeRequest;
  response_status: HttpStatusResponse;
}
export interface PasswordResetConfirmCredentials {
  username: string;
}
export interface PasswordResetConfirmationRequest {
  confirmation_code: number;
  new_password: string;
}
export interface PasswordResetConfirmationResponse {
  submitted: PasswordResetConfirmationRequest;
  response_status: HttpStatusResponse;
}
//Sign Up
export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}
export interface SignUpResponse {
  submitted: SignUpRequest;
  response_status: HttpStatusResponse;
}
export interface SignUpConfirmationCodeCredentials {
  username: string;
}
export interface SignUpConfirmationGetCodeResponse {
  submitted: null;
  response_status: HttpStatusResponse;
}
export interface SignUpConfirmationSubmitCodeResponse {
  submitted: SignUpConfirmationCodeRequest;
  response_status: HttpStatusResponse;
}
export interface SignUpConfirmationCodeRequest {
  confirmation_code: number;
}
