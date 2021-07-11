import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationApiContactorService } from 'src/app/service/authentication-api-contactor.service';
import { CustomValidators } from '../../errors/form-validators/custom-validators';
import { valid } from '../../sign-in/sign-in.component';

@Component({
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
  styleUrls: ['./confirm-sign-up.component.scss'],
})
export class ConfirmSignUpComponent implements OnInit, OnDestroy {
  codeFocused: boolean = true;
  form: FormGroup;
  errorMessage: string = '';
  sub$s!: Subscription;
  constructor(public router: Router, public activeRoute: ActivatedRoute, private AACS: AuthenticationApiContactorService) {
    const usernameControl = new FormControl({ value: '', disabled: 'true' }, [Validators.required]);
    const codeControl = new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, CustomValidators.numbersOnly],
    });
    this.form = new FormGroup({ code: codeControl, username: usernameControl });
  }
  ngOnDestroy(): void {
    if (this.sub$s === undefined) return;
    this.sub$s.unsubscribe();
  }

  ngOnInit(): void {
    this.form.controls['username'].setValue(this.activeRoute.snapshot.paramMap.get('username') || '');
  }
  async resendCode() {
    try {
      const username: string = this.activeRoute.snapshot.paramMap.get('username') || '';
      const result = await this.AACS.getSignUpConfirmationCode({ username });
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

    try {
      const result = await this.AACS.SubmitSignUpConfirmationCode({ username }, { confirmation_code: code });

      if (!result.response_status.success) {
        this.errorMessage = result.response_status.message;
        return;
      }
      console.debug(`Succesffully confirm-sign-up`);
      const navigationUrl = '/authentication/sign-in';
      const navigationBool = await this.router.navigate([navigationUrl]);
      if (navigationBool) {
        console.debug(`Navigation to ${navigationUrl} was succesful`);
      } else {
        console.error(`Navigation to ${navigationUrl} was unsuccesful`);
      }
    } catch (error) {
      console.error(`Error occured when confirming code.`, error);
      this.errorMessage = `Error occured when confirming code. Please try again.`;
    }
  }
}
