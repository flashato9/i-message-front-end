import { Injectable } from '@angular/core';
import { AuthenticationApiContactorService } from './authentication-api-contactor.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStateService {
  storage: Storage = localStorage;
  constructor(public AACS: AuthenticationApiContactorService) {}

  saveSignInToken(token: string) {
    this.storage.setItem('sign-in-token', token);
  }
  private signInTokenExistsandValid() {
    const token = this.storage.getItem('sign-in-token');
    if (token === null) return false;
    const payload: TokenData = JSON.parse(atob(token.split('.')[1]));
    if (payload.expiryDate < Date.now() / 1000) {
      this.signOutUser();
      return false;
    }
    return true;
  }
  /**
   * sign out user if it exist.
   * @postcond - Signs in user. If succesful, then save then token here. Regardless of success always return theresult of the call to be handled by the caller.
   */
  signOutUser() {
    this.storage.removeItem('sign-in-token');
  }
  async signInUser(credentials: { username: string; password: string }) {
    try {
      const result = await this.AACS.signInUser({
        username: credentials.username,
        password: credentials.password,
      });
      if (result.response_status.success) this.saveSignInToken(result.payload);
      return result;
    } catch (error) {
      throw error;
    }
  }
  userSignedIn() {
    return this.signInTokenExistsandValid();
  }
  /**
   *
   * @returns
   * @precond signedIn()===true
   */
  getSignedInUser() {
    const token = this.storage.getItem('sign-in-token');
    const payload: TokenData = JSON.parse(atob((<string>token).split('.')[1]));
    const result: UserData = payload;
    return result;
  }
}
export interface TokenData {
  email: string;
  username: string;
  expiryDate: number;
}
export interface UserData {
  email: string;
  username: string;
}
