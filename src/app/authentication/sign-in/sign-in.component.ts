import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationApiContactorService } from 'src/app/service/authentication-api-contactor.service';
import { AuthenticationStateService } from 'src/app/service/authentication-state.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  usernameFocused: boolean = true;
  passwordFocused: boolean = true;
  errorMessage: string = '';
  form: FormGroup;
  sub$s!: Subscription;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public router: Router,
    public activeRoute: ActivatedRoute,
    private AACS: AuthenticationApiContactorService,
    private ASS: AuthenticationStateService
  ) {
    const usernameControl = new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    });
    const passwordControl = new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    });
    this.form = new FormGroup({ username: usernameControl, password: passwordControl });
  }
  ngOnDestroy(): void {
    if (this.sub$s === undefined) return;
    this.sub$s.unsubscribe();
  }
  ngOnInit(): void {}
  async onSubmit() {
    this.usernameFocused = false;
    this.passwordFocused = false;
    console.log(this.form.controls.username.errors);
    this.form.markAsDirty();
    if (!valid(this.form)) {
      this.sub$s = this.form.valueChanges
        .pipe(
          tap((val) => {
            if (!valid(this.form)) {
              this.errorMessage = 'The form is not valid.';
              return;
            }
            this.errorMessage = '';
          })
        )
        .subscribe();
      this.errorMessage = 'The form is not valid.';
      return;
    }
    const username = String(this.form.controls['username'].value);
    const password = String(this.form.controls['password'].value);
    try {
      const result = await this.ASS.signInUser({
        username: username,
        password: password,
      });
      if (!result.response_status.success) {
        if (result.response_status.status_code === 2) {
          await this.AACS.getSignUpConfirmationCode({ username });
          const navigationUrl = `../sign-up/${username}/confirm-sign-up`; //set up router guards here later.
          const navigationBool = await this.router.navigate([navigationUrl], { relativeTo: this.activeRoute });
          if (navigationBool) {
            console.debug(`Navigation to ${navigationUrl} was succesful`);
          } else {
            console.error(`Navigation to ${navigationUrl} was unsuccesful`);
          }
          return;
        }
        this.errorMessage = result.response_status.message;
        return;
      }
      //succesful.
      console.debug(`Successfuly Sign-in`);
      const navigationUrl = '/home-page'; //set up router guards here later.
      const navigationBool = await this.router.navigate([navigationUrl]);
      if (navigationBool) {
        console.debug(`Navigation to ${navigationUrl} was succesful`);
      } else {
        console.error(`Navigation to ${navigationUrl} was unsuccesful`);
      }

      return;
    } catch (error) {
      console.error(`Error Occured when signing in.`, error);
      this.errorMessage = `Error occured when signing in. Please try again`;
    }
  }
}
export function valid(form: FormGroup) {
  return Object.keys(form.controls).every((key) => {
    return !form.controls[key].invalid;
  });
}
