import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from '../utils/auth.utils';
import { UserService } from './user.service';
// import { AuthUtils } from 'app/core/auth/auth.utils';
// import { UserService } from 'app/core/user/user.service';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;
  private urlApi = environment.apiUrl;
  private _menu: any[] = [];

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set userLogged(value: string) {
    sessionStorage.setItem('data_u', value);
  }

  get userLogged(): any {
    let userInfo = sessionStorage.getItem('data_u') ?? '';
    if (!userInfo) return '';
    return this.decryptData(userInfo, true);
  }

  set menu(value: string) {
    sessionStorage.setItem('data_m', value);
  }

  get menu(): any {
    let menuInfo = sessionStorage.getItem('data_m') ?? '';
    if (!menuInfo) return '';
    return this.decryptData(menuInfo, true);
  }

  /**
   * Setter & getter for authenticated flag
   */
  set authenticated(authenticated: boolean) {
    this._authenticated = authenticated;
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post('api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    console.log(credentials);

    // if (this._authenticated) {
    //   return throwError(() => new Error('User is already logged in.'));
    // }

    return this._httpClient
      .post(`${this.urlApi}usuarios/login`, credentials)
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.accessToken;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          this._userService.user = response.user;
          this.userLogged = this.encryptData(response.user, true);
          // Return a new observable with the response
          return of(response);
        })
      );
  }

  register(data: any): Observable<any> {
    return this._httpClient.post(`${this.urlApi}usuarios`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this._httpClient
      .post('api/usuarios/check-status', {
        accessToken: this.accessToken,
      })
      .pipe(
        catchError(() =>
          // Return false
          of(false)
        ),
        switchMap((response: any) => {
          // Replace the access token with the new one if it's available on
          // the response object.
          //
          // This is an added optional step for better security. Once you sign
          // in using the token, you should generate a new one on the server
          // side and attach it to the response object. Then the following
          // piece of code can replace the token with the refreshed one.
          if (response.accessToken) {
            this.accessToken = response.accessToken;
          }

          // this.menu = this.encryptData(response.menu, true);
          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service

          this._userService.user = response.user;

          console.log('user', response);
          // Return true
          return of(true);
        })
      );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated = false;
    console.log('ab ', this._authenticated);

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return this.signInUsingToken();
  }

  encryptData(value: string, isJson: boolean = false) {
    if (isJson) value = JSON.stringify(value);
    const texto = CryptoJS.AES.encrypt(value, environment.signKey).toString();
    return texto;
  }

  decryptData(encryptText: string, isJson: boolean = false) {
    var bytes = CryptoJS.AES.decrypt(encryptText, environment.signKey);
    let texto = bytes.toString(CryptoJS.enc.Utf8);
    if (isJson) texto = JSON.parse(texto);
    return texto;
  }
}
