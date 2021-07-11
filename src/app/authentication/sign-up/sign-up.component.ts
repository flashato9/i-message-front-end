import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationApiContactorService } from 'src/app/service/authentication-api-contactor.service';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../errors/form-validators/constants';
import { CustomValidators } from '../errors/form-validators/custom-validators';
import { valid } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  usernameFocused: boolean = true;
  passwordFocused: boolean = true;
  emailFocused: boolean = true;
  form: FormGroup;
  errorMessage: string = '';
  sub$s!: Subscription;
  constructor(public router: Router, public activeRoute: ActivatedRoute, private AACS: AuthenticationApiContactorService) {
    const usernameControl = new FormControl('', {
      updateOn: 'change',
      validators: [
        Validators.required,
        Validators.minLength(USERNAME_MIN_LENGTH),
        Validators.maxLength(USERNAME_MAX_LENGTH),
        CustomValidators.validUsername,
      ],
    });
    const passwordControl = new FormControl('', {
      updateOn: 'change',
      validators: [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.maxLength(PASSWORD_MAX_LENGTH),
        CustomValidators.strongPassword,
      ],
    });
    const emailControl = new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, Validators.email],
    });
    this.form = new FormGroup({ username: usernameControl, password: passwordControl, email: emailControl });
  }
  ngOnDestroy(): void {
    if (this.sub$s === undefined) return;
    this.sub$s.unsubscribe();
  }

  ngOnInit(): void {}
  async onSubmit() {
    this.usernameFocused = false;
    this.passwordFocused = false;
    this.emailFocused = false;
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
    const email = String(this.form.controls['email'].value);

    try {
      const result = await this.AACS.signUpUser({ username: username, password: password, email: email });
      if (!result.response_status.success) {
        this.errorMessage = result.response_status.message;
        return;
      }
      console.debug(`Succesffully Sign-up`);
      const navigationUrl = `./${username}/confirm-sign-up`;
      const navigationBool = await this.router.navigate([navigationUrl], { relativeTo: this.activeRoute });
      if (navigationBool) {
        console.debug(`Navigation to ${navigationUrl} was succesful`);
      } else {
        console.error(`Navigation to ${navigationUrl} was unsuccesful`);
      }
    } catch (error) {
      console.error(`Error occured when signing up.`, error);
      this.errorMessage = `Error occured when signing up. Please try again.`;
    }
  }
}
