import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AuthenticationApiContactorService,
  HttpError,
  HttpStatusResponse,
  PasswordResetCodeCredentials,
  PasswordResetCodeResponse,
  PasswordResetConfirmationRequest,
  PasswordResetConfirmationResponse,
  PasswordResetConfirmCredentials,
  SignInRequest,
  SignInResponse,
  SignUpConfirmationCodeCredentials,
  SignUpConfirmationCodeRequest,
  SignUpConfirmationGetCodeResponse,
  SignUpConfirmationSubmitCodeResponse,
  SignUpRequest,
  SignUpResponse,
} from './authentication-api-contactor.service';

@Injectable()
export default class TestAuthenticaitonApiContactorService implements AuthenticationApiContactorService {
  constructor(public http: HttpClient) {}
  readonly authenticationURL: string = environment.API_URL + '/authentication';

  async signInUser(request: SignInRequest): Promise<SignInResponse> {
    return SIRsDefault;
  }
  async getResetPasswordConfirmationCode(credentials: PasswordResetCodeCredentials): Promise<PasswordResetCodeResponse> {
    return PRCdRsDefault;
  }
  async submitNewPassword(
    credentials: PasswordResetConfirmCredentials,
    request: PasswordResetConfirmationRequest
  ): Promise<PasswordResetConfirmationResponse> {
    return PRCfRsDefault;
  }
  async signUpUser(request: SignUpRequest): Promise<SignUpResponse> {
    return SURsDefault;
  }
  async getSignUpConfirmationCode(credentials: SignUpConfirmationCodeCredentials): Promise<SignUpConfirmationGetCodeResponse> {
    return SUCGCRsDefault;
  }
  async SubmitSignUpConfirmationCode(
    credentials: SignUpConfirmationCodeCredentials,
    request: SignUpConfirmationCodeRequest
  ): Promise<SignUpConfirmationSubmitCodeResponse> {
    return SUCSCRsDefault;
  }
}

////INTERFACES DEFAULTS
export const HEDefault: HttpError = {
  code: 'temp code',
  message: 'http error occured',
};

export const HSRDefault: HttpStatusResponse = {
  success: true,
  status_code: 10,
  message: 'Successful',
};
//Sign-In
export const SIRQDefault: SignInRequest = {
  username: 'flashato9',
  password: 'KOOmson!@!@!1',
};
export const SIRsDefault: SignInResponse = {
  submitted: SIRQDefault,
  response_status: HSRDefault,
  payload: 'Sign in is succesful',
};
//Password Reset
export const PRCCDefault: PasswordResetCodeCredentials = {
  username: 'flashato9',
};
export const PRCdRsDefault: PasswordResetCodeResponse = {
  submitted: PRCCDefault,
  response_status: HSRDefault,
};
export const PRCfCDefault: PasswordResetConfirmCredentials = {
  username: 'flashato9',
};
export const PRCRQDefault: PasswordResetConfirmationRequest = {
  confirmation_code: 12345,
  new_password: 'KOOL',
};
export const PRCfRsDefault: PasswordResetConfirmationResponse = {
  submitted: PRCRQDefault,
  response_status: HSRDefault,
};
//Sign Up
export const SURqDefault: SignUpRequest = {
  username: 'flashato9',
  email: 'ato_koomson@hotmail.ca',
  password: 'Koomson!@!@!',
};
export const SURsDefault: SignUpResponse = {
  submitted: SURqDefault,
  response_status: HSRDefault,
};
export const SUCCCDefault: SignUpConfirmationCodeCredentials = {
  username: 'flashato9',
};
export const SUCCRqDefault: SignUpConfirmationCodeRequest = {
  confirmation_code: 12345,
};
export const SUCSCRsDefault: SignUpConfirmationSubmitCodeResponse = {
  submitted: SUCCRqDefault,
  response_status: HSRDefault,
};
export const SUCGCRsDefault: SignUpConfirmationGetCodeResponse = {
  submitted: null,
  response_status: HSRDefault,
};
