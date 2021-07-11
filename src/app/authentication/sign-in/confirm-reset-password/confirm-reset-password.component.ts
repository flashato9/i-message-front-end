import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationApiContactorService } from 'src/app/service/authentication-api-contactor.service';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../errors/form-validators/constants';
import { CustomValidators } from '../../errors/form-validators/custom-validators';
import { valid } from '../sign-in.component';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.scss'],
})
export class ConfirmResetPasswordComponent implements OnInit, OnDestroy {
  passwordFocused: boolean = true;
  codeFocused: boolean = true;
  form: FormGroup;
  errorMessage: string = '';
  sub$s!: Subscription;
  constructor(public router: Router, public activeRoute: ActivatedRoute, private AACS: AuthenticationApiContactorService) {
    const codeControl = new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, CustomValidators.numbersOnly],
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
    this.form = new FormGroup({ code: codeControl, password: passwordControl });
  }
  ngOnDestroy(): void {
    if (this.sub$s === undefined) return;

    this.sub$s.unsubscribe();
  }

  ngOnInit(): void {}
  async resendCode() {
    try {
      const username: string = this.activeRoute.snapshot.paramMap.get('username') || '';
      const result = await this.AACS.getResetPasswordConfirmationCode({ username });
      if (!result.response_status.success) {
        this.errorMessage = result.response_status.message;
        return;
      }

      return;
    } catch (error) {
      console.log('Error occured when sending the confirmation code', error);
      this.errorMessage = `Error occured when sending your confirmation code. Please try again.`;
    }
  }
  async onSubmit() {
    this.passwordFocused = false;
    this.codeFocused = false;
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
    const code = parseInt(this.form.controls['code'].value);
    const username: string = this.activeRoute.snapshot.paramMap.get('username') || '';
    const password = String(this.form.controls['password'].value);

    try {
      const result = await this.AACS.submitNewPassword(
        { username: username },
        { confirmation_code: code, new_password: password }
      );
      if (!result.response_status.success) {
        this.errorMessage = result.response_status.message;
        return;
      }
      console.debug(`Succesffully confirm reset password`);
      const navigationUrl = '/authentication/sign-in';
      const navigationBool = await this.router.navigate([navigationUrl]);
      if (navigationBool) {
        console.debug(`Navigation to ${navigationUrl} was succesful`);
      } else {
        console.error(`Navigation to ${navigationUrl} was unsuccesful`);
      }
    } catch (error) {
      console.error(`Error occured when reseting password.`, error);
      this.errorMessage = `Error occured when reseting password. Please try again.`;
    }
  }
}
